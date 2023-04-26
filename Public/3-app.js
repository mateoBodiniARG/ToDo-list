const input = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const taskList = document.getElementById("list-content");
const MAX_TASKS = 9;
const savedTasks = loadTasksFromStorage();
const date = document.getElementById("fecha_actual")
const pendingTaskMessage = document.getElementById('p-taskPendingID')


// Inicializa ScrollReveal
ScrollReveal();

// Configura la animación
ScrollReveal().reveal('#pAnimation', { 
  delay: 700,
  duration: 1000,
  distance: '40px',
  origin: 'top'
});

ScrollReveal().reveal('.todo-app', { 
  delay: 300,
  duration: 1000,
  distance: '70px',
  origin: 'bottom'
});

ScrollReveal().reveal('.title', { 
  delay: 100,
  duration: 1000,
  distance: '-40px',
  origin: 'top'
});

ScrollReveal().reveal('#fecha_actual', { 
  delay: 800,
  duration: 1000,
  distance: '40px',
  origin: 'top'
});
ScrollReveal().reveal('#list-content', { 
  delay: 400,
  duration: 1000,
  distance: '40px',
  origin: 'rigth'
});





// Carga las tareas desde localStorage
function loadTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Guarda las tareas en localStorage
function saveTasksToStorage() {
  const tasks = Array.from(taskList.children).map(task => ({
    description: task.textContent.replace("×", "").trim(),
    completed: task.classList.contains("checked")
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



// Agrega una tarea a la lista
function addTask() {
  const newTaskDescription = input.value.trim();

  if (newTaskDescription === "") {
    alert("Debe ingresar una tarea!"); // No puede haber campo vacio
    return;
  }

  if (taskList.children.length >= MAX_TASKS) {
    alert("Ya ha agregado el número máximo de tareas permitido!"); // Maximo de tareas = 9
    return;
  }
  

  const newTask = createTaskElement(newTaskDescription);
  taskList.appendChild(newTask);
  input.value = "";

  
  checkPendingTask(); // llama a la función para actualizar el mensaje de tareas pendientes
  saveTasksToStorage();
}

// Revisa si hay tareas pendientes y actualiza el mensaje
function checkPendingTask() {
  if (taskList.children.length === 0) {
    pendingTaskMessage.classList.remove('p-taskPending')
  } else {
    pendingTaskMessage.classList.add('p-taskPending')
  }
}


// Crea un elemento de tarea
function createTaskElement(description) {
  const newTask = document.createElement("li");
  const newSpan = document.createElement("span");

  newTask.textContent = description;
  newSpan.textContent = "\xd7";
  newSpan.classList.add("delete-btn");

  newTask.appendChild(newSpan);
  newTask.addEventListener("click", handleTaskClick);

  return newTask;
}

// Manejador de eventos para hacer clic en una tarea o botón
function handleTaskClick(event) {
  const target = event.target;

  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    saveTasksToStorage();
  } else if (target.classList.contains("delete-btn")) {
    target.parentElement.remove();
    saveTasksToStorage();
  }

  checkPendingTask(); // llama a la función para actualizar el mensaje de tareas pendientes

}

// Manejador de eventos para agregar tarea
function handleAddTask(event) {
  if (event.keyCode === 13 || event.type === "click") {
    addTask();
  }
}

// Configura los manejadores de eventos
btnAdd.addEventListener("click", handleAddTask);
input.addEventListener("keydown", handleAddTask);

// Carga las tareas iniciales
savedTasks.forEach(task => {
  const newTask = createTaskElement(task.description);
  if (task.completed) {
    newTask.classList.add("checked");
  }
  taskList.appendChild(newTask);
});

// Llama a la función para actualizar el mensaje de tareas pendientes después de cargar las tareas
checkPendingTask();

// Fechaf

// Fecha
const fecha = new Date();

// Obtener el día, mes y año
const dia = fecha.getDate();
const mes = fecha.toLocaleString('en-EN', { month: 'long' });
const anio = fecha.getFullYear();
const diaSemana = fecha.toLocaleDateString('en-EN', { weekday: 'long' });

date.innerHTML = ` Today is ${diaSemana} ${dia} of ${mes} of the year ${anio}`;


