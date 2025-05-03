import checkBtnFuntc from "../components/checkIcon.js";
import deleteBtnFunct from "../components/deleteIcon.js";
import editBtnFunct from "../components/editIcon.js";
import actualizarMensajeNoTasks from "../components/textNoTask.js";

function createLi(tarea){
    const content = `
    <div class="task-header">
        <div>
            <button class="complete-btn">
                <i class="${tarea.completada ? "fas fa-check-circle" : "fas fa-circle"}"></i> <!-- Icono no completado -->
            </button>
            <span class="task-title">${tarea.titulo}</span>
        </div>
        <button class="arrow-btn" title="Mostrar descripción">
            <i class="fas fa-angle-down"></i>
        </button>
    </div>
    
    <div class="task-footer">
        <p class="task-description">${tarea.descripcion}</p>
        <div class="task-date-buttons">
            <span class="task-date">${tarea.fecha}</span>
            <div class="task-actions">
                <button class="edit-btn" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" title="Eliminar">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    </div>
    `;
    const li = document.createElement('li'); //Creamos un LI
    li.classList.add('task-item')
    li.id = crypto.randomUUID(); // Agregamos un ID unico
    li.innerHTML = content; // Metemos dentro la estructura del taskItem

    const ul = document.querySelector('.task-list') // Obtenemos el UL
    ul.appendChild(li); // Agregamos como un nuevo hijo cada LI
    actualizarMensajeNoTasks();

    // Check Boton
    const checkBtn = li.querySelector(".complete-btn");
    checkBtn.addEventListener('click', () => {
        tarea.completada = !tarea.completada; // Actualiza el array
        checkBtnFuntc(checkBtn);
    })

    // Desplegar Descripcion
    const btnArrow = li.querySelector('.arrow-btn');
    btnArrow.addEventListener('click', () =>{ // Recuerda, no pasamos una funcion con parametros directamente porque se ejecuta en automatico, no espera a que se de click.
        desplegarDesc(btnArrow);
    })

    // EDIT Boton
    const editBtn = li.querySelector('.edit-btn');
    editBtnFunct(editBtn);

    // DELETE Boton
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtnFunct(deleteBtn);

};

// Desplegar descripcion Funcion.
function desplegarDesc(btnArrow) {
    // btnArrow.closest('.task-item') es lo mismo que acceder a li en la funcion de arriba, y de ahi buscar el elemento hijo que queremos obtener.
    const footer = btnArrow.closest('.task-item').querySelector('.task-footer');

    btnArrow.classList.toggle('rotated');
    footer.classList.toggle('visible');
};

export default createLi;