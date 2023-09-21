import express from 'express';
import { CreateTodo, deleteTodo, getTodos, updateTodo } from '../controller/todoController';
import { auth } from '../middlewares/auth';
const router = express.Router();

/* GET home page. */
router.get('/create', auth, CreateTodo );
router.get('/get-todos', auth, getTodos );
router.patch('/update-todos/:id', auth, updateTodo);
router.delete('/delete-todos/:id', auth, deleteTodo);

export default router;
