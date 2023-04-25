const input = document.getElementById("inputTask");
const btnAdd = document.getElementById("btnAdd");
const taskList = document.getElementById("list-content");
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Inicializa ScrollReveal
ScrollReveal();

// Configura la animación
ScrollReveal().reveal('.todo-app', { 
  delay: 300,         // Retardo antes de la animación
  duration: 1000,     // Duración de la animación
  distance: '70px',   // Distancia desde donde empieza la animación
  origin: 'bottom'    // Dirección desde la que aparece el elemento
});

ScrollReveal().reveal('.title', { 
  delay: 100,         // Retardo antes de la animación
  duration: 1000,     // Duración de la animación
  distance: '-40px',   // Distancia desde donde empieza la animación
  origin: 'top',    // Dirección desde la que aparece el elemento
  
});



savedTasks.forEach((task) => {
  const newTask = document.createElement("li");
  const newSpan = document.createElement("span"); // se crea un nuevo elemento span
  newSpan.textContent = "\xd7"; // se le asigna el contenido del span
  newTask.textContent = task.description;
  if (task.completed) {
    newTask.classList.add("checked");
  }
  newTask.appendChild(newSpan); // se añade el span al li
  taskList.appendChild(newTask);
});



// ADD TASK
function addTask() {
  if (input.value === "") {
    alert("Debe ingresar una tarea!");
  } else {
    if (taskList.children.length >= 10) {
      alert("Ya ha agregado el número máximo de tareas permitido!");
      return;
    }

    let newTask = document.createElement("li");
    newTask.innerHTML = input.value;
    let cross = document.createElement("span");
    cross.innerHTML = "\xd7";
    newTask.appendChild(cross);
    input.value = "";

    taskList.appendChild(newTask);

    // LocalStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({
      description: newTask.textContent.replace("×", ""), 
      completed: false,
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}



btnAdd.addEventListener("click", addTask);

input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
});




// CHECKED TASK
taskList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");

    // Guardar en LocalStorage
    const tasks = Array.from(taskList.children).map((task) => {
      return {
        description: task.textContent.replace("×", ""),
        completed: task.classList.contains("checked"),
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else if (event.target.tagName === "SPAN") {
    console.log("haz hecho clic");
    event.target.parentElement.remove();

    // Guardar en LocalStorage
    const tasks = Array.from(taskList.children).map((task) => {
      return {
        description: task.textContent,
        completed: task.classList.contains("checked"),
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}, false);
