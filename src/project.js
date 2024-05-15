import {Todo} from "./todo";

//create empty project function
const createProject = function(projectName){
    let project = [];
    let projectString = JSON.stringify(project);
    localStorage.setItem(projectName, projectString);
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
const removeItem = function(projectName, ){

}

//show projects
const showProjects = function(){
 for(let i=0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    console.log(key);
 }

}

//check if project exists
const checkProject = function(projectName){
    for(let i=0; i < localStorage.length; i++){
        if(projectName === localStorage.key(i)) return true;
    }
    return false;
}


//display todos in a project
const displayProject = function(projectName){
    let project = JSON.parse(localStorage.getItem(projectName));
    for(let i=0; i < project.length; i++){
        let todo = Todo(project[i].title, project[i].description, project[i].dueDate, project[i].priority);
        console.log(todo.getTitle());
    }
}

//update todo

export {createProject, addItem, removeItem, showProjects, checkProject, displayProject};