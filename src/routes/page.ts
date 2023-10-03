import express, { NextFunction, Request, Response } from 'express';
import { auth } from '../middlewares/auth';
import { v4 as uuidv4 } from 'uuid';
import { TodoInstance } from '../model/todoModel';
import { createTodoSchema, options } from '../utils/utils';

const router = express.Router();


// Pages

router.get('/', auth, ( req: Request, res: Response, next: NextFunction ) => {
    res.render('Register')
})


// Display page
router.get('/dashboard', auth, ( req: Request, res: Response, next: NextFunction ) => {
    res.render('Home')
})

router.get('/login', auth, ( req: Request, res: Response, next: NextFunction ) => {
    res.render('Login')
})

// Create Todo
router.post('/dashboard', auth, async ( req: Request | any, res: Response ) => {
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
})

export default router;