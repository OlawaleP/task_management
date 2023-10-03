import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import { Login, Register, Logout } from '../controller/userController';
import { getUserAndTodo } from '../controller/todoController';

/* GET users listing. */
router.post('/register', Register);
router.post('/login', Login);
router.get('/get-user', getUserAndTodo);
router.get('/logout', Logout);

export default router;
