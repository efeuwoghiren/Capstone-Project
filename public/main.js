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
