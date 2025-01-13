import express from 'express';
import todoController  from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);    
router.put('/:id', todoController.updateTodo);
router.put('/:id/complete', todoController.completeTodo);
router.put('/:id/incomplete', todoController.incompleteTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;