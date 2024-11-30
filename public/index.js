// Simulated in-memory task store
let tasks = [];

// Open Modal for task creation
function openModal() {
    document.getElementById('taskModal').style.display = 'flex';
}

// Close Modal
function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

// Create new task
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const desc = document.getElementById('taskDesc').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;

    const task = {
        id: Date.now(),
        title,
        description: desc,
        deadline,
        priority,
        status: 'todo',  // Default status is "To Do"
    };

    tasks.push(task);
    updateTaskBoard();
    closeModal();
    document.getElementById('taskForm').reset();
});

// Update Task Board
function updateTaskBoard() {
    const todoList = document.getElementById('todo-list');
    const inProgressList = document.getElementById('in-progress-list');
    const doneList = document.getElementById('done-list');

    todoList.innerHTML = '';
    inProgressList.innerHTML = '';
    doneList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        if (task.status === 'todo') {
            todoList.appendChild(taskElement);
        } else if (task.status === 'in-progress') {
            inProgressList.appendChild(taskElement);
        } else if (task.status === 'done') {
            doneList.appendChild(taskElement);
        }
    });
}

// Create Task Element (HTML)
function createTaskElement(task) {
    const div = document.createElement('div');
    div.classList.add('task-item');
    div.dataset.id = task.id;

    div.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <small>Priority: ${task.priority} | Deadline: ${task.deadline}</small>
        <div>
            <button onclick="updateTaskStatus(${task.id}, 'in-progress')">In Progress</button>
            <button onclick="updateTaskStatus(${task.id}, 'done')">Done</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    return div;
}

// Update task status (move between columns)
function updateTaskStatus(taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        updateTaskBoard();
    }
}

// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    updateTaskBoard();
}

// Initial call to populate task board if tasks already exist
updateTaskBoard();

// Function to open task modal
function openTaskModal() {
    document.getElementById("taskModal").style.display = "block";
}

// Function to close task modal
function closeTaskModal() {
    document.getElementById("taskModal").style.display = "none";
}

// Function to open login modal
function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
}

// Function to close login modal
function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

// Function to open register modal
function openRegisterModal() {
    document.getElementById("registerModal").style.display = "block";
}

// Function to close register modal
function closeRegisterModal() {
    document.getElementById("registerModal").style.display = "none";
}

// Handle Login Form Submission (client-side)
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    
    // Simple client-side validation (make sure fields are not empty)
    if (email && password) {
        console.log('Logging in with:', email, password);
        closeLoginModal(); // Close the modal after login (for simplicity)
    } else {
        alert('Please fill in both fields!');
    }
});

// Handle Register Form Submission (client-side)
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let email = document.getElementById('registerEmail').value;
    let password = document.getElementById('registerPassword').value;
    let confirmPassword = document.getElementById('registerConfirmPassword').value;

    // Simple client-side validation
    if (email && password && confirmPassword) {
        if (password === confirmPassword) {
            console.log('Registering with:', email, password);
            closeRegisterModal(); // Close the modal after registration (for simplicity)
        } else {
            alert('Passwords do not match!');
        }
    } else {
        alert('Please fill in all fields!');
    }
});
