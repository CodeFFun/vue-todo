import express from 'express';
import todoController from '../controller/todoController.js';

const todoRouter = express.Router();
const controller = new todoController();

todoRouter.get('/', controller.getTodoList)
todoRouter.get('/:id', controller.getTodoList)
todoRouter.post('/', controller.addTodo)
todoRouter.patch('/:id', controller.updateTodo)
todoRouter.delete('/:id', controller.deleteTodo)

export default todoRouter;