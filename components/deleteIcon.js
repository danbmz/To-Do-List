import actualizarMensajeNoTasks from "./textNoTask.js";

function deleteBtnFunct(btn){
    btn.addEventListener('click', () => {
        const taskItem = btn.closest('.task-item');

        if(taskItem){
            taskItem.style.transition = 'opacity 1s ease';
            taskItem.style.opacity = '0';
            
            setTimeout(() => {
                taskItem.remove();
                actualizarMensajeNoTasks(); // Si este va afuera se ejecuta antes de remover el item, pues este se elimina 1 segundos despues.
            }, 1000); // Espera a que termine la animación
            
        }
    })
}

export default deleteBtnFunct;