
const buttons = document.querySelectorAll('.button-row button');
const contents = document.querySelectorAll('.content');

buttons.forEach(button => {
    button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    contents.forEach(content => content.classList.remove('active'));
    const contentId = button.getAttribute('data-content');
    document.getElementById(contentId).classList.add('active');
    });
});
// Lấy các phần tử DOM
var taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const LOCAL_STORAGE_KEY = "todoList";

function loadTasks() {
  try {
    const tasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    tasks.forEach(task => createTaskElement(task.text, task.completed));
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    alert("Could not load tasks. Data may be corrupted.");
    localStorage.removeItem(LOCAL_STORAGE_KEY); 
  }
}

// Lưu danh sách vào localStorage
function saveTasks() {
  try {
    const tasks = [];
    document.querySelectorAll(".task-item").forEach(taskItem => {
      tasks.push({
        text: taskItem.querySelector("span").textContent,
        completed: taskItem.classList.contains("completed"),
      });
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
}

// Hàm tạo một phần tử công việc
function createTaskElement(taskText, completed = false) {
  if (!taskText) return;

  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  
  if (completed) {
    taskItem.classList.add("completed");
  }

  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;

  // Nút hoàn thành
  const completeBtn = document.createElement("button");
  completeBtn.textContent = "\u2714";
  completeBtn.className = "complete-btn";
  completeBtn.addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    saveTasks(); 
  });

  // Nút xóa
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "\u274C";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", () => {
    taskItem.remove();
    saveTasks(); 
  });

  // Gắn các phần tử con vào task item
  taskItem.appendChild(taskContent);
  taskItem.appendChild(completeBtn);
  taskItem.appendChild(deleteBtn);


  taskList.appendChild(taskItem);
}

// Hàm thêm công việc mới
function addTask() {
  var taskText = taskInput.value.trim();

  if (!taskText) {
    alert("Please enter a task!");
    return;
  }

  createTaskElement(taskText); 
  saveTasks();
  taskInput.value = ""; 
}

//enter to loadtasks
document.getElementById('taskInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && !(taskInput.value.trim() === "")) {
    addTask();
    event.target.value = '';
    taskInput = document.getElementById("taskInput");
    console.log(taskInput.value.trim());
    saveTasks();
  }
});

addTaskBtn.addEventListener("click", addTask);
loadTasks();



  