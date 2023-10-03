import { Request, Response } from "express";
import { UserInstance } from "../model/userModel";
import {v4 as uuidv4} from 'uuid';
import { loginUserSchema, options, registerUserSchema } from "../utils/utils";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
const jwtsecret = process.env.JWT_SECRET as string;

/* ===========================LOGIC=====================================*/

// export const Register = async ( req: Request, res: Response ) => {
//   try {
//     const { email, firstName, password, confirm_password } = req.body;
//     const iduuid = uuidv4();

//     const validationResult = registerUserSchema.validate(req.body, options);

//     if(validationResult.error) {
//       return res.status(400).json({
//         Error: validationResult.error.details[0].message
//       });
//     }

//     // Hash Password
//     const passwordHash = await bcrypt.hash(password, 8)

//     // Check if user exist
//     const user = await UserInstance.findOne({
//       where: { email: email }
//     })

//     if (!user) {
//       let newUser = await UserInstance.create({
//         id: iduuid,
//         email,
//         firstName,
//         password: passwordHash
//       })

//       // Generate token for user
//       const User = await UserInstance.findOne({
//         where: { email: email }
//       }) as unknown as {[key:string]:string};

//       const { id } = User;

//       const token = jwt.sign({ id }, jwtsecret, {expiresIn:"30mins"});
//       res.cookie('token', token, {httpOnly:true, maxAge:30 * 60 * 1000})

//     return res.status(201).json({
//       msg: "user created successfully",
//       newUser,
//       token
//     })
//     }

//     res.status(409).json({
//       error: "email already taken"
//     })

//   } catch (error) {
//       console.log(error)
//       res.status(500).json({ Error: "Internal server error" })
//   }
// }

// export const Login = async (req:Request, res:Response)=> {
//   try {
//     const { email, password } = req.body;

//     const validationResult = loginUserSchema.validate(req.body);

//     if(validationResult.error) {
//       return res.status(400).json({
//         Error: validationResult.error.details[0].message
//       });
//     }

//      // Generate token for user
//      const User = await UserInstance.findOne({
//       where: { email: email }
//     }) as unknown as {[key:string]:string};

//     const { id } = User;

//     const token = jwt.sign({ id }, jwtsecret, {expiresIn:"30d"});
//     res.cookie('token', token, {httpOnly:true, maxAge:30 * 24 * 60 * 60 * 1000})

//     const validUser = await bcrypt.compare(password, User.password);

//     if ( validUser ) {
//       return res.status(201).json({
//         msg: "You have successfully logged in",
//         User,
//         token
//       })
//     }

//     return res.status(400).json({ Error: "Invalid email/password"})
  
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ Error: "Internal server error" })
//   }
// }

/* ===========================EJS API=====================================*/

export const Register = async ( req: Request, res: Response ) => {
  try {
    const { email, firstName, password, confirm_password } = req.body;
    const iduuid = uuidv4();

    const validationResult = registerUserSchema.validate(req.body, options);

    if(validationResult.error) {
      return res.render("Register", { Error:validationResult.error.details[0].message })
    }

    // Hash Password
    const passwordHash = await bcrypt.hash(password, 8)

    // Check if user exist
    const user = await UserInstance.findOne({
      where: { email: email }
    })

    if (!user) {
      let newUser = await UserInstance.create({
        id: iduuid,
        email,
        firstName,
        password: passwordHash
      })

      // Generate token for user
      const User = await UserInstance.findOne({
        where: { email: email }
      }) as unknown as {[key:string]:string};

      const { id } = User;

      const token = jwt.sign({ id }, jwtsecret, {expiresIn:"30mins"});
     // return res.cookie('token', token, {httpOnly:true, maxAge:30 * 60 * 1000})

    return res.redirect("/login")
    }

    return res.render("Register", { error: "email is already taken"})

  } catch (error) {
      console.log(error)
      // res.status(500).json({ Error: "Internal server error" })
  }
}

export const Login = async (req:Request, res:Response)=> {
  try {
    const { email, password } = req.body;

    const validationResult = loginUserSchema.validate(req.body);

    if(validationResult.error) {
      return res.render("Login", {
        error: validationResult.error.details[0].message
      });
    }

     // Generate token for user
     const User = await UserInstance.findOne({
      where: { email: email }
    }) as unknown as {[key:string]:string};

    const { id } = User;

    const token = jwt.sign({ id }, jwtsecret, {expiresIn:"30d"});
    res.cookie('token', token, {httpOnly:true, maxAge:30 * 24 * 60 * 60 * 1000})

    const validUser = await bcrypt.compare(password, User.password);

    if ( validUser ) {
      return res.redirect('/dashboard')
    }

    return res.render("Login", { error: "Invalid email/password" })
  
  } catch (error) {
    console.log(error);
    // res.status(500).json({ Error: "Internal server error" })
  }
}

export const Logout = (req: Request, res:Response) => {
  res.clearCookie("token");
  res.redirect('/login')
}