document.addEventListener("DOMContentLoaded", () => {
    const listContainer = document.getElementById("ft_list");
    const newTodoButton = document.getElementById("newTodo");

    loadTodos();

    newTodoButton.addEventListener("click", () => {
        const todoText = prompt("Enter your TO-DO:");
        if (todoText && todoText.trim() !== "") {
            addTodo(todoText);
            saveTodos();
        }
    });

    function addTodo(text) {
        const todo = document.createElement("div");
        todo.textContent = text;
        todo.classList.add("todo-item");

        todo.addEventListener("click", () => {
            const confirmDelete = confirm("Do you want to delete this TO-DO?");
            if (confirmDelete) {
                todo.remove();
                saveTodos();
            }
        });

        listContainer.prepend(todo);
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll(".todo-item").forEach(todo => {
            todos.push(todo.textContent);
        });
        localStorage.setItem("todos", JSON.stringify(todos));
        console.log("Data saved:", todos); // เพิ่ม console.log() เพื่อตรวจสอบ
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        console.log("Data loaded:", todos); // เพิ่ม console.log() เพื่อตรวจสอบ
        todos.forEach(todoText => addTodo(todoText));
    }
});