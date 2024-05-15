import './style.css';
import {Todo} from "./todo";
import { createProject, addItem, removeItem, showProjects, checkProject, displayProject} from "./project";
import {loadAll} from './ui';


//temp add stuff to localStorage
createProject("china");
addItem("china", Todo("eat dogs", "i love dogs", "11-11-2023", "high"));

//nav bar button clicks
const allButton = document.querySelector(".all");
allButton.addEventListener("click", () =>{
    loadAll();
});





const options = function(){
    console.log("What would you like to do?");
    console.log("1) add todo");
    console.log("2) view todos");
    console.log("3) view todos in a project");
    let answer = Number(prompt("Option : "));
    switch(answer){
        //add todo
        case 1:{
            showProjects();
            let projectName = prompt("Enter project name: ");
            //project exists
            if(checkProject(projectName)){
                //create todo object
                const title = prompt("Title: ");
                const description = prompt("Description: ");
                const dueDate = prompt("Due date: ");
                const priority = prompt("Priority: ");
                const todo = Todo(title, description, dueDate, priority);

                //add todo object to project
                addItem(projectName, todo);
            }
            //project does not exist
            else{
                //create project
                createProject(projectName);

                //create todo object
                const title = prompt("Title: ");
                const description = prompt("Description: ");
                const dueDate = prompt("Due date: ");
                const priority = prompt("Priority: ");
                const todo = Todo(title, description, dueDate, priority);

                //add todo object to project
                addItem(projectName, todo);
            }
            break;
        }
        //view todos
        case 2:{
            showProjects();
            break;
        }
        //view todos in a project
        case 3:{
            let projectName = prompt("Enter project name");
            displayProject(projectName);
        }
    }
}

