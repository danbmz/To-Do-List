function editBtnFunct(btn){
    btn.addEventListener('click', () =>{
        // Obtenemos el Item actual y su ID
        const taskItem = btn.closest('.task-item');
        const id = taskItem.id;

        // Obtenemos los Datos de la Tarea Actual
        const title = taskItem.querySelector('.task-title').textContent; // Acceder a contenido entre etiquetas
        const description = taskItem.querySelector('.task-description').textContent;
        const date = taskItem.querySelector('.task-date').textContent;

        // Obtenemos los inputs del Form y los rellenamos con los datos de la tarea
        document.querySelector('#titulo').value = title;
        document.querySelector('#descripcion').value = description;
        document.querySelector('#deadLine').value = date;
        document.querySelector('.btn').value = 'Guardar';


        // Cuando se presiona el boton Guardar se deben asignar los nuevos valores al TaskItem actual.

        // Despues de eso, hay que regresar el texto del InputSubmit a la normalidad (Crear) 

        // console.log(inputTitle.value);
    } )
};

export default editBtnFunct;