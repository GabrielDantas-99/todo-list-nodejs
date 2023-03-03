const tasksModel = require('../models/tasks.model');

const findAll = async (request, response) => {
    const tasks = await tasksModel.findAll();
    return response.status(200).json(tasks);
};

module.exports = {
    findAll
};