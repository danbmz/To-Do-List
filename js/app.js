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

// Funcion para Icono de Filtrado y Funciones
document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filter-toggle');
    const filterOptions = document.getElementById('filter-options');
    const radioButtons = document.querySelectorAll('input[name="filter"]');

    filterToggle.addEventListener('click', function() {
        filterOptions.classList.toggle('show');
        if (filterOptions.classList.contains('show')) {
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.checked) {
                        const selectedValue = this.value;
                        
                        // Llama a la función de filtrado con el valor seleccionado
                        aplicarFiltro(selectedValue);
                    }
                });
            });
        }
    });
    
    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!filterToggle.contains(event.target) && !filterOptions.contains(event.target)) {
            filterOptions.classList.remove('show');
        }
    });
});

// Objeto que facilita la seleccion de cada funcion de filtrado
const filtros = {
    'option1': () => mostrarTodasLasCards(),
    'option2': () => filtrarPorPendientes(),
    'option3': () => filtrarPorVencer(),
    'option4': () => filtrarPorVencidas(),
    'option5': () => filtrarPorCompletadas(),
    'option6': () => OrdenarPorFecha()
};

// FUNCIONES DE FILTRADO
function aplicarFiltro(valorSeleccionado) {
    if (filtros[valorSeleccionado]) {
        filtros[valorSeleccionado](); // Ejecuta la función correspondiente
    } else {
        mostrarTodasLasCards(); // Opción por defecto
    }
}
// Mostrar todas las CARDS
function mostrarTodasLasCards(){
    const cards = document.querySelectorAll('.task-item');
    cards.forEach(card => {
        card.style.display = 'block';
    });
};
// Mostrar tareas pendientes (con tiempo mayor a 2 dias);
function filtrarPorPendientes(){
    const cards = document.querySelectorAll('.task-item');
    cards.forEach(card => {
        const date = card.querySelector('.task-date').textContent;

        const currentDate = new Date();
        const inputDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);

        // 3. Calcular la diferencia en milisegundos
        const diferenciaMs = inputDate - currentDate;
        
        // 4. Convertir milisegundos a horas (1 hora = 3,600,000 ms)
        const diferenciaHoras = diferenciaMs / 3600000;
        
        card.style.display = diferenciaHoras > 48 ? 'block' : 'none';
    })
};