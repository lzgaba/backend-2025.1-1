import express from 'express';
import TaskController from '../controllers/TaskController.js';

const router = express.Router();

// Rotas das Tarefas
router.get('/tasks', TaskController.list);
router.get('/tasks/create', TaskController.create);
router.post('/tasks/save', TaskController.save);
router.get('/tasks/edit/:id', TaskController.edit);
router.post('/tasks/update', TaskController.update);
router.post('/tasks/remove/:id', TaskController.remove);
router.post('/tasks/update-status/:id', TaskController.updateStatus);

export default router;
