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

const taskDelete = async (id) => {
    await fetch(`${url}/${id}`, {
        method: 'delete',
    });
    loadTasks();
}

// Funções Utils:
const formatDate = (dateUTC) => {
    const options = {
        dateStyle: 'long',
        timeStyle: 'short'
    }
    const date = new Date(dateUTC).toLocaleString('pt-br',options);
    return date;
}







addForm.addEventListener('submit', taskCreate);

