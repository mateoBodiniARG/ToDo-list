const input = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const taskList = document.getElementById("list-content");
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach((task) => {
  const newTask = document.createElement("li");
  newTask.textContent = task.description;
  if (task.completed) {
    newTask.classList.add("checked");
  }
  taskList.appendChild(newTask);
});

// ADD TASK
btnAdd.addEventListener("click", () => {
  if (input.value === "") {
    alert("Debe ingresar una tarea!");
  } else {
    let newTask = document.createElement("li");
    newTask.innerHTML = input.value;
    taskList.appendChild(newTask);
    input.value = "";

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
      description: newTask.textContent,
      completed: false,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

// CHECKED TASK
taskList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    const tasks = Array.from(taskList.children).map((task) => {
      return {
        description: task.textContent,
        completed: task.classList.contains("checked"),
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
