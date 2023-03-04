const addForm = document.querySelector('.form');

const inputText = document.querySelector('.input-text');

// Funções CRUD:
const taskCreate = async (event) => {
    event.preventDefault();

    const task = { title: inputText.value };

    await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    })

    loadTasks();
    inputText.value = '';
}
const taskUpdate = async ({ id, title, status }) => {

    await fetch(`${url}/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status }),
    });
    
    loadTasks();
}

const taskDelete = async (id) => {
    await fetch(`${url}/${id}`, {
        method: 'delete',
    });
    loadTasks();
}

addForm.addEventListener('submit', taskCreate);

