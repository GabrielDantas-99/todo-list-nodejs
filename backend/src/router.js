const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/tasks.controller');
const tasksMiddleware = require('./middlewares/tasks.middleware');

router.get('/tasks', tasksController.findAll);
router.post('/tasks',tasksMiddleware.validateBody, tasksController.taskCreate);

module.exports = router;