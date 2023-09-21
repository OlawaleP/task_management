import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();


// Pages

router.get('/', ( req: Request, res: Response, next: NextFunction ) => {
    res.render('Register')
})

router.get('/dashboard', ( req: Request, res: Response, next: NextFunction ) => {
    res.render('Home')
})

router.get('/login', ( req: Request, res: Response, next: NextFunction ) => {
    res.render('Login')
})

export default router