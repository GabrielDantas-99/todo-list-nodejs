const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/tasks.controller');
const tasksMiddleware = require('./middlewares/tasks.middleware');

router.get('/tasks', tasksController.findAll);
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.taskCreate);
router.put('/tasks/:id', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldStatus, tasksController.taskUpdate);
router.delete('/tasks/:id', tasksController.taskDelete);

module.exports = router;