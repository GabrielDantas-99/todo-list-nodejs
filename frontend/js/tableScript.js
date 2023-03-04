const tbody = document.querySelector('tbody');
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
    select.addEventListener('change', ({ target }) => taskUpdate({ ...task, status: target.value }))

    tdStatus.appendChild(select);

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

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

// Funções Utils:
const formatDate = (dateUTC) => {
    const options = {
        dateStyle: 'long',
        timeStyle: 'short'
    }
    const date = new Date(dateUTC).toLocaleString('pt-br',options);
    return date;
}

loadTasks();