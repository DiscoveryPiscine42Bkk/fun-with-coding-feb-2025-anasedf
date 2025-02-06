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
        // ใช้คุกกี้ในการจัดเก็บข้อมูล
        document.cookie = `todos=${JSON.stringify(todos)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }

    function loadTodos() {
        // อ่านค่าคุกกี้
        const cookies = document.cookie.split(';');
        const todosCookie = cookies.find(cookie => cookie.trim().startsWith('todos='));
        if (todosCookie) {
            const todos = JSON.parse(todosCookie.split('=')[1]);
            todos.forEach(todoText => addTodo(todoText));
        }
    }
});