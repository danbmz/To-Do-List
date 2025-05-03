import actualizarMensajeNoTasks from "../components/textNoTask.js";

function checkBtnFuntc(btn){

        const icon = btn.firstElementChild;
        icon.style.color = "#55D0F0cc";
        icon.classList.replace("fa-circle" ,"fa-check-circle");
        const taskItem = btn.closest('.task-item');

        if(taskItem){
            taskItem.style.transition = 'opacity 1s ease';
            taskItem.style.opacity = '0';
            
            setTimeout(() => {
                taskItem.remove();
                actualizarMensajeNoTasks(); // Si este va afuera se ejecuta antes de remover el item, pues este se elimina 1 segundos despues.
            }, 1000); // Espera a que termine la animación
            
        };
}

export default checkBtnFuntc;