const connection = require('./connection');

const findAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

module.exports = {
    findAll
};