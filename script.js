
let tasks = JSON.parse(
  localStorage.getItem("tasks")
) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let div = document.createElement("div");
    div.className = "task";

    let name = document.createElement("span");
    name.textContent = task.name + " | " + task.deadline +
      " | " + task.priority;

    if (task.completed) name.classList.add("completed");

    let complete = document.createElement("button");
    complete.textContent = task.completed ? "Undo" : "Complete";
    complete.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      displayTasks();
    };

    let del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    };

    div.append(name, complete, del);
    list.appendChild(div);
  });
}

function addTask() {
  let name = document.getElementById("taskInput").value.trim();
  let deadline = document.getElementById("deadline").value;
  let priority = document.getElementById("priority").value;

  if (!name) {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    name,
    deadline,
    priority,
    completed: false
  });

  saveTasks();
  displayTasks();
  document.getElementById("taskInput").value = "";
}

displayTasks();
