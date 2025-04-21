function verification(title, titleError, description, descriptionError, deadLine, deadlineError, errores) {
    // Limpiar errores previos
    Object.keys(errores).forEach(key => delete errores[key]);
    
    let isValid = true;

    // Validación de título
    if (!title.value.trim()) {
        errores.title = "Ingresa un Título";
        title.classList.add("error");
        titleError.textContent = errores.title;
        titleError.style.display = "block";
        isValid = false;
        setTimeout(() => {
            titleError.style.display = "none";
            title.classList.remove('error');
        }, 3000);
    } else {
        title.classList.remove('error');
        titleError.style.display = "none";
    }

    // Validación de descripción
    if (!description.value.trim()) {
        errores.description = "Ingresa una Descripción";
        isValid = false;
        description.classList.add('error');
        descriptionError.textContent = errores.description;
        descriptionError.style.display = "block";
        setTimeout(() => {
            descriptionError.style.display = "none";
            description.classList.remove('error');
        }, 3000);
    } else {
        description.classList.remove('error');
        descriptionError.style.display = "none";
    }

    // Validación de fecha
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const inputDate = new Date(deadLine.value);
    inputDate.setHours(0, 0, 0, 0);

    if (!deadLine.value || isNaN(inputDate.getTime())) {
        errores.deadline = "Ingresa una fecha válida";
        isValid = false;
        deadLine.classList.add("error");
        deadlineError.textContent = errores.deadline;
        deadlineError.style.display = "block";
        setTimeout(() => {
            deadlineError.style.display = "none";
            deadLine.classList.remove('error');
        }, 3000);
    } else if (inputDate < currentDate) {
        deadLine.classList.add("error");
        deadlineError.textContent = "La fecha no puede ser anterior a hoy";
        deadlineError.style.display = "block";
        setTimeout(() => {
            deadlineError.style.display = "none";
            deadLine.classList.remove('error');
        }, 3000);
        errores.deadline = "La fecha no puede ser pasada";
        isValid = false;
    } else {
        deadLine.classList.remove('error');
        deadlineError.style.display = "none";
    }

    return isValid;
}

export default verification;