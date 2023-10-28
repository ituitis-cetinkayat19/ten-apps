const form = document.querySelector("form");
const input = document.querySelector("input");
const todos = document.querySelector(".todos");

const todosLocal = JSON.parse(localStorage.getItem("todosLocal")) || [];

function loadLocal() {
    todosLocal.forEach(todo => {
        addToDo(todo.text, todo.completed);
    });
}

loadLocal();

form.addEventListener("submit", e => {
    e.preventDefault();
    addToDo(input.value);
});

function addToDo(value, done = false) {
    const todo = value;
    if(todo) {
        const todoEl = document.createElement("li");
        todoEl.innerHTML = todo;
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("done");
            updateLocal();
        });
        todoEl.addEventListener("contextmenu", e => {
            e.preventDefault();
            todoEl.remove();
            updateLocal();
        });
        if(done)
            todoEl.classList.add("done");
        todos.appendChild(todoEl);
        input.value = "";
        updateLocal();
    }
}

function updateLocal() {
    const notesEl = document.querySelectorAll("li");
    const todosLocal = [];
    notesEl.forEach(note => {
        todosLocal.push({
            text: note.innerText,
            completed: note.classList.contains("done")
        });
    });

    localStorage.setItem("todosLocal", JSON.stringify(todosLocal));
}