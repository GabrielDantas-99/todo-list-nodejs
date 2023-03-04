const tasksModel = require('../models/tasks.model');

const findAll = async (request, response) => {
    const tasks = await tasksModel.findAll();
    return response.status(200).json(tasks);
};

const taskCreate = async (request, response) => {
    const createdTask = await tasksModel.taskCreate(request.body);
    return response.status(201).json(createdTask);
};

module.exports = {
    findAll,
    taskCreate
};