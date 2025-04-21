
function actualizarMensajeNoTasks() {
    const listaTasks = document.querySelectorAll('.task-item'); // Selecciona todos los <li> de tareas existentes
    const noTaskTexto = document.querySelector('.no-activities');

    if (listaTasks.length === 0) {
      noTaskTexto.classList.remove("hidden"); // Muestra el mensaje si NO hay tareas
    } else {
      noTaskTexto.classList.add("hidden"); // Oculta el mensaje si hay al menos una
    }
};

export default actualizarMensajeNoTasks;
