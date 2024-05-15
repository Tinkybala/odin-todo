//todo object fatory function

function Todo(title, description, dueDate, priority){
    
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;

    const setTitle = (newTitle) => title = newTitle;
    const setDescription = (newDescription) => description = newDescription;
    const setDueDate = (newDueDate) => dueDate =  newDueDate;
    const setPriority = (newPriority) => priority = newPriority;

    const toPlainObject = () =>({title, description, dueDate, priority});

    return {getTitle, getDescription, getDueDate, getPriority, setTitle, setDescription, setDueDate, setPriority, toPlainObject};
}

export {Todo};