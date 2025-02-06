// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskData => {
        addTaskFromStorage(taskData.text, taskData.value, taskData.completed);
    });
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const taskText = li.querySelector('span').textContent;
        const value = li.querySelector('.value-input').value;
        const completed = li.classList.contains('completed');
        tasks.push({ text: taskText, value, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a task from localStorage
function addTaskFromStorage(taskText, value, completed) {
    const li = document.createElement('li');

    // Create a span for the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    if (completed) {
        li.classList.add('completed');
    }

    // Add a delete button to the task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function () {
        taskList.removeChild(li);
        saveTasks();
    };

    // Create an input field for the value
    const valueInput = document.createElement('input');
    valueInput.type = 'number';  // You can change this to 'text' if you want non-numeric values
    valueInput.placeholder = 'Value';
    valueInput.classList.add('value-input');
    valueInput.value = value;  // Set the value from storage

    // Mark task as complete when clicked
    taskSpan.onclick = function () {
        li.classList.toggle('completed');
        saveTasks();
    };

    // Append the value input and delete button to the list item
    li.appendChild(taskSpan);
    li.appendChild(valueInput);
    li.appendChild(deleteBtn);

    // Append the list item to the task list
    taskList.appendChild(li);
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    addTaskFromStorage(taskText, '', false);  // Add task with empty value initially
    saveTasks();  // Save tasks after adding a new one
    taskInput.value = '';  // Clear the input field
}

// Event listener for the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks from localStorage when the page loads
loadTasks();
