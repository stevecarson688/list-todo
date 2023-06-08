const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');


const todoItemsList = document.querySelector('.todo-items');

let todos = [];
todoForm.addEventListener('submit',
    function (e) {
        e.preventDefault();
        addTodo(todoInput.value);

    });

function addTodo(item) {
    
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value = '';
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        if (item.completed == true) {
            li.class.add('checked');
        }
        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
        `;

        todoItemsList.append(li);
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function getFormLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;

        }
    });
    addToLocalStorage(todos);
}


function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });

    addToLocalStorage(todos);
}


getFormLocalStorage();



document.addEventListener('click', function (e) {
    // delete task
    if (e.target.className === 'delete-button') {
        const id = e.target.parentNode.dataset.key
        const serializedID = parseInt(id, 10)
        deleteTodo(serializedID);
        e.target.parentNode.remove('data-key');
    }

    if (e.target.classList.contains('delete-button')) {
        e.target.classList.toggle('data-key');
    }



}, false);


























