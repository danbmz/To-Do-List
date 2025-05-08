import createLi from "./createList.js";
import verification from "./verification.js";
import actualizarMensajeNoTasks from "../components/textNoTask.js";

// Boton y formulario para el envio del FORMULARIO
const btn = document.querySelector('.crear-btn');
// const form = document.querySelector('.formulario');

// Array para almacenar los objetos de informacion de cada CARD
let tareas = [];

// FUNCION PARA OBTENER Y CREAR UN NUEVO CARD DE LA LISTA
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
        // Agregamos los datos a un nuevo objeto
        const nuevaTarea = {
            id: crypto.randomUUID(), // id unico
            titulo: title.value,
            fecha: deadLine.value, 
            descripcion: description.value,
            completada: false, // Por defecto
            creado: new Date() // Fecha de creacion
        };
        // Agregamos el objeto al array
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

// ICONO DE OPCIONES DE FILTRADO Y FUNCIONES 
const filterToggle = document.getElementById('filter-toggle');
const filterOptions = document.getElementById('filter-options');
const radioButtons = document.querySelectorAll('input[name="filter"]');
// Despliega el menu de opciones al clickear el Icono
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

// Objeto que facilita la seleccion de cada funcion de filtrado
const filtros = {
    'option1': () => mostrarTodasLasCards(),
    'option2': () => filtrarPorPendientes(),
    'option3': () => filtrarPorVencer(),
    'option4': () => filtrarPorVencidas(),
    'option5': () => OrdenarPorFecha()
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
        const date = card.querySelector('.task-date').textContent; // Obtenemos la fecha de cada CARD
        // Obtenemos la fecha actual y convertimos las fechas obtenidas
        const currentDate = new Date();
        const inputDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0); //Seteamos ambas fechas
        inputDate.setHours(0, 0, 0, 0);

        // Calcular la diferencia en milisegundos
        const diferenciaMs = inputDate - currentDate;
        
        // Convertir milisegundos a horas (1 hora = 3,600,000 ms)
        const diferenciaHoras = diferenciaMs / 3600000;
        
        card.style.display = diferenciaHoras > 48 ? 'block' : 'none'; // 48h para mostrar todas las que sean mayor a 3 dias
    })
};
// Mostrar tareas pendientes (con tiempo menor a 5 o 6 dias)
function filtrarPorVencer(){
    const cards = document.querySelectorAll('.task-item');
    console.log(cards);
    cards.forEach(card => {
        const date = card.querySelector('.task-date').textContent; // Obtenemos la fecha de cada CARD
        // Obtenemos la fecha actual y convertimos las fechas obtenidas
        const currentDate = new Date();
        const inputDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0); //Seteamos ambas fechas
        inputDate.setHours(0, 0, 0, 0);

        // Calcular la diferencia en milisegundos
        const diferenciaMs = inputDate - currentDate;
        
        // Convertir milisegundos a horas (1 hora = 3,600,000 ms)
        const diferenciaHoras = diferenciaMs / 3600000;
        
        card.style.display = diferenciaHoras < 48 ? 'block' : 'none';
    });
}
// Mostrar tareas que no se cumplieron en la fecha programada ()
function filtrarPorVencidas(){
    const cards = document.querySelectorAll('.task-item');
    cards.forEach(card => {
        const date = card.querySelector('.task-date').textContent; // Obtenemos la fecha de cada CARD
        // Obtenemos la fecha actual y convertimos las fechas obtenidas
        const currentDate = new Date();
        const inputDate = new Date(date);
        currentDate.setHours(0, 0, 0, 0); //Seteamos ambas fechas
        inputDate.setHours(0, 0, 0, 0);

        // Calcular la diferencia en milisegundos
        const diferenciaMs = inputDate - currentDate;
        
        // Convertir milisegundos a horas (1 hora = 3,600,000 ms)
        const diferenciaHoras = diferenciaMs / 3600000;
        
        card.style.display = diferenciaHoras < 0 ? 'block' : 'none';
    });
}
// Mostrar las tareas de forma ordenada (fechas menores a mayores)
// function OrdenarPorFecha(){
//     const cards = document.querySelectorAll('.task-item');
//     cards.forEach(card => {
//         const date = card.querySelector('.task-date').textContent;

//     })
//     console.log(cards);
//     // cards.sort((a,b) => )
// }