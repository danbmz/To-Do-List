import createLi from "./createList.js";
import verification from "./verification.js";
import actualizarMensajeNoTasks from "../components/textNoTask.js";

// ELEMENTOS GLOBALES
const btn = document.querySelector('.crear-btn');
// const form = document.querySelector('.formulario');

// FUNCION PARA OBTENER Y CREAR UN NUEVO LI DE LA LISTA
const createTask = (e) =>{
    e.preventDefault();

    const title = document.getElementById('titulo');
    const description = document.querySelector('#descripcion');
    const deadLine = document.querySelector('#deadLine');    
    const titleError = document.getElementById("title-error");
    const deadlineError = document.getElementById("deadline-error");   
    const descriptionError = document.getElementById("description-error");   

    // Mensajes de error
    const errores = {};
    
    // Verificacion del Formulario
    verification(title, titleError, description, descriptionError, deadLine, deadlineError, errores);

    // Si la longitud es 0, no hay errores y creamos una nueva lista
    if(Object.keys(errores).length === 0){ 

        setTimeout(() => {
            // Crear la Lista
            createLi(title.value, description.value, deadLine.value);
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