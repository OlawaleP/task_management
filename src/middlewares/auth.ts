import { NextFunction, Request, Response  } from "express";
import jwt from 'jsonwebtoken';
import { UserInstance } from "../model/userModel";
const jwtsecret = process.env.JWT_SECRET as string;

/* =================================== API MIDDLEWARE =================================  */

// export async function auth (req: Request | any, res: Response, next: NextFunction){
//     try {
//         // const authorization = req.headers.authorization;
//         const authorization = req.cookies.token;

//         if(!authorization) {
//             return res.status(401).json({error: "Kindly sign in as a user"})
//         }

//         // const token = authorization.slice(7, authorization.length);

//         let verified = jwt.verify( authorization, jwtsecret );

//         if (!verified) {
//             return res.status(401).json({error: "token invalid, you can't access this route"})
//         }

//         const { id } = verified as {[key:string]: string};

//         //find user by id;
//         const user = await UserInstance.findOne({ where: {id}})

//         if(!user) {
//             return res.status(401).json({error: "Kindly register/sign in as a user"})
//         }

//         req.user = verified
//         next();

//     } catch (error) {
//         res.status(401).json({ error: "User not logged in"})
//     }
// }

/* =================================== EJS MIDDLEWARE =================================  */

export async function auth (req: Request | any, res: Response, next: NextFunction){
    try {
        // const authorization = req.headers.authorization;
        const authorization = req.cookies.token;

        if(!authorization) {
            //return res.status(401).json({error: "Kindly sign in as a user"})
            return res.redirect('/login')
        }

        // const token = authorization.slice(7, authorization.length);

        let verified = jwt.verify( authorization, jwtsecret );

        if (!verified) {
           // return res.status(401).json({error: "token invalid, you can't access this route"})
           return res.redirect('/login')
        }

        const { id } = verified as {[key:string]: string};

        //find user by id;
        const user = await UserInstance.findOne({ where: {id}})

        if(!user) {
           // return res.status(401).json({error: "Kindly register/sign in as a user"})
           return res.redirect('/login')
        }

        req.user = verified
        next();

    } catch (error) {
        return res.redirect('/login')
    }
}