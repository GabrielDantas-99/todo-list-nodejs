const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.form');
const modal = document.getElementById('deleteModal');
const task_id = document.getElementById('task_id');
const excluirBtn = document.querySelector('#excluirBtn');
const inputText = document.querySelector('.input-text');
const url = 'http://localhost:3333/tasks';

// Funções de requição e mapeamento da tabela:
const fetchTasks = async () => {
    const response = await fetch(url);
    
    const tasks = await response.json();
    return tasks;
}

const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach(task => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

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

const openModal = (id) => {
    task_id.value = id;
    modal.classList.add('show');
    modal.style.display = "block";
    modal.setAttribute('role', 'dialog');
}

function hideModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
}

excluirBtn.addEventListener('click', () => {
    taskDelete(task_id.value);
    hideModal();
});

// Funções de criação das linhas tabela:
const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    if (innerText) {
        element.innerText = innerText;
    }

    if (innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}

const createRow = (task) => {

    const { id, title, created_at, status } = task;

    const tr = createElement('tr');

    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);
    tdStatus.appendChild(select);

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');

    editButton.classList.add("btn");
    editButton.classList.add("btn-warning");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");

    deleteButton.setAttribute('data-bs-toggle', 'modal');
    // deleteButton.setAttribute('data-bs-target', '#deleteModal');

    deleteButton.addEventListener('click', () => openModal(id));

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    tdActions.classList.add("d-flex");
    tdActions.classList.add("justify-content-around");

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
}

const createSelect = (value) => {

    const options = `
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em Andamento</option>
        <option value="concluida">Concluída</option>
    `;

    const select = createElement('select', '', options);
    select.value = value;
    select.classList.add("form-select");

    return select;
}

addForm.addEventListener('submit', taskCreate);


// Personalizando modal para exluir task
const btnClose = document.querySelector('.btn-close');
const btnCancelar = document.querySelector('.btn-cancelar');
btnClose.addEventListener('click', () => hideModal());
btnCancelar.addEventListener('click', () => hideModal());



loadTasks();