
const API = "http://localhost:4000";

const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signbtn = document.getElementById('signbtn');
const logemail = document.getElementById('logemail');
const logpassword = document.getElementById('logpassword');
const signinbtn = document.getElementById('signinbtn');

signbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const userData = {
        name: name.value,
        email: email.value,
        password: password.value
    };
    const res = await fetch(`${API}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });
    console.log(await res.json());
    name.value = '';
    email.value = '';
    password.value = '';
});

signinbtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const loginData = { 
        email: logemail.value,
        password: logpassword.value
    };
    const res = await fetch(`${API}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    });
    console.log(await res.json());
    logemail.value = '';
    logpassword.value = '';
});


const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
addTodoBtn.addEventListener('click', async () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        console.log('Adding todo:', todoText);
        todoInput.value = '';
    }
});


const todoList = document.getElementById('todo-list');



async function fetchTodos() {
    try {
        const res = await fetch(`${API}/todos`);
        const todos = await res.json();
        todoList.innerHTML = '';    
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            li.className = 'border-b py-2';
            todoList.appendChild(li);
        }
        );
    } catch (error) {
        console.error('Error fetching todos:', error);
    }   
}


fetchTodos();




