import { Router } from 'express';
import { TodoController } from '../controllers/todos.controller';

const router = Router();

const todoController = new TodoController();

router.get('/', (req, res) => todoController.getAllTodos(req, res));

router.post('/', (req, res) => todoController.createTodo(req, res));

router.put('/:id', (req, res) => todoController.updateTodo(req, res));

router.delete('/:id', (req, res) => todoController.deleteTodo(req, res));

export default router;
