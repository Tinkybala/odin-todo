import {Todo} from "./todo";

//create empty project function
const createProject = function(projectName){
    let project = [];
    let projectString = JSON.stringify(project);
    localStorage.setItem(projectName, projectString);
}

//removes project from localStorage
const removeProject = function(projectName){
    localStorage.removeItem(projectName);
    console.log("project deleted");
}



//returns array of project names
const getProjects = function(){
    const projects = [];
    for(let i=0; i < localStorage.length; i++){
        projects.push(localStorage.key(i));
    }

    return projects;
}

//check if project exists
const checkProject = function(projectName){
    for(let i=0; i < localStorage.length; i++){
        if(projectName === localStorage.key(i)) return true;
    }
    return false;
}

//this adds an item to a project
const addItem = function(projectName, todo){
    let project = JSON.parse(localStorage.getItem(projectName));
    project.push(todo.toPlainObject());
    let projectString = JSON.stringify(project);
    localStorage.setItem(projectName, projectString);
    console.log("item added");
}


//this removes an item from a project
const removeItem = function(projectName, index){
    let project = JSON.parse(localStorage.getItem(projectName));
    project.splice(index, 1);
    let projectString = JSON.stringify(project);
    localStorage.setItem(projectName, projectString);
    console.log("item deleted");
}

//this modifies an item in a project
const modifyItem = function(projectName, index, attribute, newTitle){
    const project = JSON.parse(localStorage.getItem(projectName));
    const todo = Todo(project[index].title, project[index].description, project[index].dueDate, project[index].priority);

    switch(attribute){
        case "title":
            todo.setTitle(newTitle);
    }


    project[index] = todo.toPlainObject();
    //console.log(project);
    const projectString = JSON.stringify(project);
    localStorage.setItem(projectName, projectString)
}


//return array of todos in a project
const getTodos = function(projectName){
    let todos = [];
    let project = JSON.parse(localStorage.getItem(projectName));
    for(let i=0; i < project.length; i++){
        let todo = Todo(project[i].title, project[i].description, project[i].dueDate, project[i].priority);
        todos.push(todo);
    }
    return todos;
}

//this returns an array of Todo objects
const getAllTodos = function(){
    let allTodos = [];
    for(let i=0; i < localStorage.length; i++){
        let todos = getTodos(localStorage.key(i));
        todos.forEach(element =>{
            allTodos.push(element);
        })
    }
    return allTodos;
}

//update todo

export {createProject, addItem, removeItem, getProjects, checkProject, getTodos, getAllTodos, removeProject, modifyItem};