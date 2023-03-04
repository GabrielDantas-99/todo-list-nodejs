const tbody = document.querySelector('tbody');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks');

    const tasks = await response.json();
    return tasks;
}

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

const task = {
    id: 1,
    title: "hellow galera",
    created_at: "00 jan de 2023 00:12",
    status: "em andamento"
}

const createRow = (task) => {

    const { id, title, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);

    const tdCreatedAt = createElement('td', created_at);
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);

    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');

    editButton.classList.add("btn");
    editButton.classList.add("btn-warning");
    deleteButton.classList.add("btn");
    deleteButton.classList.add("btn-danger");

    tdStatus.appendChild(select);

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    tdActions.classList.add("d-flex");
    tdActions.classList.add("justify-content-around");

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);

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

createRow(task);