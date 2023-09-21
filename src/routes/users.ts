import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

import { Login, Register } from '../controller/userController';
import { getUserAndTodo } from '../controller/todoController';

/* GET users listing. */
router.post('/register', Register);
router.post('/login', Login);
router.get('/get-user', getUserAndTodo);

export default router;
