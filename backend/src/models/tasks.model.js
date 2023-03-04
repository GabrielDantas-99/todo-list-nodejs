const connection = require('./connection');

const findAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

const taskCreate = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';
    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);
    return {insertId: createdTask.insertId};
};

const taskUpdate = async (id, task) => {
    const {title, status} = task;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
};

const taskDelete = async (id) => {
    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return removedTask;
};

module.exports = {
    findAll,
    taskCreate,
    taskUpdate,
    taskDelete
};