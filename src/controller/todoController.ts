import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { TodoInstance } from '../model/todoModel';
import { UserInstance } from '../model/userModel';
import { createTodoSchema, options, updateTodoSchema } from '../utils/utils';

export const CreateTodo = async ( req: Request | any, res: Response ) => {
    try {
        const verified = req.user;
        const id = uuidv4();
        // const { description, completed } = req.body;

        const validationResult = createTodoSchema.validate(req.body, options);

        if(validationResult.error) {
          return res.status(400).json({
            Error: validationResult.error.details[0].message
          });
        }
    

        const todoRecord = await TodoInstance.create({
            id,
            ...req.body,
            userId: verified.id
        })

        return res.status(201).json({
            msg: "You have successfully created a todo",
            todoRecord
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const getTodos = async (req: Request, res:Response) => {
    try {
        const limit = req.query?.limit as | number | undefined;
        const offset = req.query?.offset as number | undefined;
            //sequelize findAll or findAndCountAll

    const getAllTodos = await TodoInstance.findAndCountAll(
    {   
        limit:limit,
        offset:offset
    }   
    );
    return res.status(200).json({
        msg: "You have successfully retrieve all data",
        count: getAllTodos.count,
        todo: getAllTodos.rows
    })
    } catch (error) {
        console.log(error);
    }
}

export const getUserAndTodo = async ( req: Request, res:Response ) => {
    try {
            //sequelize findAll or findAndCountAll

    const getAllUser = await UserInstance.findAndCountAll({
        include: [
            {
                model: TodoInstance,
                as:"todo"
            }
        ]
    });   

    return res.status(200).json({
        msg: "You have successfully retrieve all data",
        count: getAllUser.count,
        users: getAllUser.rows

    })
    } catch (error) {
        console.log(error);
    }
}

export const updateTodo = async ( req: Request, res: Response ) => {
    try {

        const { id } = req.params;
        const { completed } = req.body;

        const validationResult = updateTodoSchema.validate(req.body, options);

        if(validationResult.error) {
          return res.status(400).json({
            Error: validationResult.error.details[0].message
          });
        }

        const updateTodo = await TodoInstance.findOne({ where: { id }});

        if(!updateTodo) {
            return res.status(400).json({
                error: "Canno find todo",
            })
        }

        const updatedRecord = await updateTodo.update({
            completed
        })

        return res.status(200).json({
            msg: "You have updated your todo",
            updatedRecord
        })
    
    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const record = await TodoInstance.findOne({ where: { id }});
        if(!record) {
            return res.status(400).json({
                error: "Cannot find todo"
            })
        }

        const deletedRecord = await record.destroy();

        return res.status(200).json({
            msg: "You have successfully deleted your todo",
            deletedRecord
        })
    } catch (error) {
        console.log(error);
    }
}