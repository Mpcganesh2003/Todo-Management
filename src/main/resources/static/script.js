const API_URL = "http://localhost:3690/todos";

// Load all todos
function loadTodos() {
    fetch("http://localhost:3690/todos/getalltodo")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("todoList");
            list.innerHTML = "";

            data.forEach(todo => {
                list.innerHTML += `
                <div class="todo ${todo.isCompleted ? 'completed' : ''}">
                    <h3>${todo.title}</h3>
                    <p>${todo.description}</p>
                    <p>${todo.email}</p>
                    <p>${todo.isCompleted ? "✅ Completed" : "⏳ Pending"}</p>

                    <button onclick="openEdit(${todo.id}, '${todo.title}', '${todo.description}', '${todo.email}')">✏️ Edit</button>
                    <button onclick="markComplete(${todo.id})">✔</button>
                    <button onclick="deleteTodo(${todo.id})">🗑</button>
                </div>
                `;
            });
        });
}

// Add todo
function addTodo() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const email = document.getElementById("email").value;

    fetch("http://localhost:3690/todos/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            email,
            isCompleted: false
        })
    })
    .then(() => {
        loadTodos();
    });
}

// Delete todo
function deleteTodo(id) {
    fetch(`${"http://localhost:3690/todos"}/${id}`, {
        method: "DELETE"
    })
    .then(() => loadTodos());
}

// Mark complete
function markComplete(id) {
    fetch(`${"http://localhost:3690/todos"}/${id}`)
        .then(res => res.json())
        .then(todo => {
            todo.isCompleted = true;

            fetch(`${"http://localhost:3690/todos"}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            })
            .then(() => loadTodos());
        });
}

// Load on page start
loadTodos();



// Open modal
function openEdit(id, title, description, email) {
    document.getElementById("editModal").style.display = "flex";

    document.getElementById("editId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editDescription").value = description;
    document.getElementById("editEmail").value = email;
}

// Close modal
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// Update todo
function updateTodo() {
    const id = document.getElementById("editId").value;

    const updatedTodo = {
        id: id,
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDescription").value,
        email: document.getElementById("editEmail").value,
        isCompleted: document.querySelector(".completed") ? true : false
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
    })
    .then(() => {
        closeModal();
        loadTodos();
    });
}