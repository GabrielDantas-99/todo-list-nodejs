const tasksModel = require('../models/tasks.model');

const findAll = async (request, response) => {
    const tasks = await tasksModel.findAll();
    return response.status(200).json(tasks);
};

const taskCreate = async (request, response) => {
    const createdTask = await tasksModel.taskCreate(request.body);
    return response.status(201).json(createdTask);
};

const taskUpdate = async (request, response) => {
    const { id } = request.params;
    await tasksModel.taskUpdate(id, request.body);
    return response.status(204).json();
};

const taskDelete = async (request, response) => {
    const { id } = request.params;
    await tasksModel.taskDelete(id);
    return response.status(204).json();
};

module.exports = {
    findAll,
    taskCreate,
    taskUpdate,
    taskDelete
};