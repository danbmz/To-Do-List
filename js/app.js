import createLi from "./createList.js";
import verification from "./verification.js";
import actualizarMensajeNoTasks from "../components/textNoTask.js";

// ELEMENTOS GLOBALES
const btn = document.querySelector('.crear-btn');
// const form = document.querySelector('.formulario');

let tareas = [];

// FUNCION PARA OBTENER Y CREAR UN NUEVO LI DE LA LISTA
const createTask = (e) =>{
    e.preventDefault();

    const title = document.getElementById('titulo');
    const description = document.querySelector('#descripcion');
    const deadLine = document.querySelector('#deadLine');    

    // Mensajes de error
    const errores = {};
    
    // Verificacion del Formulario
    verification(title, description, deadLine, errores);

    // Si la longitud es 0, no hay errores y creamos una nueva lista
    if(Object.keys(errores).length === 0){ 

        const nuevaTarea = {
            id: Date.now(), // Usamos el timestamp como ID único
            titulo: title.value,
            fecha: deadLine.value, 
            descripcion: description.value,
            completada: false // Por defecto
          };

        tareas.push(nuevaTarea);

        setTimeout(() => {
            // Crear la Lista
            createLi(nuevaTarea);
            // Verificamos la existencia de taskItems, sino hay, mostramos un mensaje
            actualizarMensajeNoTasks();

            // Limpiar el Formulario
            title.value = '';
            description.value = '';
            deadLine.value = '';
        }, 500);
    };

};

btn.addEventListener('click', createTask);
// form.addEventListener('submit', createTask); // Cuando usamos este no se activa la verificacion que hemos hecho, al parecer para darle estilos o personalizar los mensajes de error habra que hacerlo diferente.

// PRUEBA PARA ICONO DE FILTRADO
document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filter-toggle');
    const filterOptions = document.getElementById('filter-options');
    
    filterToggle.addEventListener('click', function() {
        filterOptions.classList.toggle('show');
        // filterOptions.classList.toggle('visible');
    });
    
    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!filterToggle.contains(event.target) && !filterOptions.contains(event.target)) {
            filterOptions.classList.remove('show');
        }
    });
});