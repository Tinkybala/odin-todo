import './style.css';
import {Todo} from "./todo";
import { createProject, addItem, removeItem, getProjects, checkProject, removeProject} from "./project";
import {loadAll, load, loadToday, loadWeek, insertTodoButton} from './ui';


//functions

//display projects in sidebar
const displayProjects = function(){
    const projects = getProjects();
    const projectsBar = document.querySelector(".projects");

    //remove existing
    const toRemove = Array.from(document.querySelectorAll(".projects > button"));
    toRemove.forEach(element =>{
        element.parentNode.removeChild(element);
    })
    
    //insert projects
    for(let i=0; i < projects.length; i++){
        let projectButton = document.createElement("button");
        let container = document.createElement("span");
        let projectName = document.createElement("p");
        let deleteButton = document.createElement("button");


        container.classList.add("project-content");
        projectButton.classList.add("project");
        deleteButton.classList.add("delete-button");

        deleteButton.setAttribute("type", "button");
        projectButton.setAttribute("type", "button");

        projectName.textContent = projects[i];
        deleteButton.textContent = "delete";
        container.appendChild(projectName);
        container.appendChild(deleteButton);
        projectButton.appendChild(container);

        projectsBar.appendChild(projectButton);

        //delete button click
        deleteButton.addEventListener("click", ()=>{
            removeProject(projects[i]);
            displayProjects();
        })

        //project button click
        projectButton.addEventListener("click", ()=>{
            load(projects[i]);
            insertTodoButton(projects[i]);
        })

        


        projectsBar.appendChild(projectButton);
    }
}



//add project button clicked
const addProjectClick = function(){

    const projectsBar = document.querySelector(".projects");
    const addProjectButton = document.querySelector(".add-project-button");

    //remove add projects button and replace with form
    projectsBar.removeChild(addProjectButton);
    const form = document.createElement("form");
    //when form is submitted
    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        let projectName = document.querySelector("input").value;
        createProject(projectName);
        insertAddProject(projectName);
    })

    //create internal div
    const container = document.createElement("div");

    //text input
    const projectInput = document.createElement("input");
    projectInput.setAttribute("type", "text");
    projectInput.setAttribute("name", "project");
    form.appendChild(projectInput);

    //submit and cancel buttons
    const addButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    addButton.textContent = "Add";
    cancelButton.textContent = "Cancel";
    container.appendChild(addButton);
    container.appendChild(cancelButton);
    form.appendChild(container);

    addButton.setAttribute("type", "submit");
    addButton.classList.add("add-button");

    cancelButton.setAttribute("type", "button");
    cancelButton.classList.add("cancel-button");

    //cancel button clicked
    cancelButton.addEventListener("click", ()=>{
        insertAddProject();
    })


    projectsBar.appendChild(form);

}

//insert the add project button
const insertAddProject = function(projectName){
    const projectsBar = document.querySelector(".projects");
    const form = document.querySelector("form");
    const addProjectButton = document.createElement("button");
    addProjectButton.classList.add("add-project-button");

    //add project button clicks
    addProjectButton.addEventListener("click", ()=>{
        addProjectClick();
    })


    //No existing projects
    if(form === null){
        addProjectButton.textContent = "Add Project";
        addProjectButton.setAttribute("type", "button");
        projectsBar.appendChild(addProjectButton);


    }
    //When add button is clicked in form
    else{
        //remove form
        projectsBar.removeChild(form);

        displayProjects();

        //insert add project button
        addProjectButton.textContent = "Add Project";
        addProjectButton.setAttribute("type", "button");
        projectsBar.appendChild(addProjectButton);
    }   
}

















//on startup load all tasks
displayProjects();
insertAddProject();
loadAll();
insertTodoButton("all");

//nav bar button clicks
const allButton = document.querySelector(".all");
allButton.addEventListener("click", () =>{
    loadAll();
    insertTodoButton();
});

const todayButton = document.querySelector(".today");
todayButton.addEventListener("click", ()=>{
    loadToday();
})

const weekButton = document.querySelector(".week");
weekButton.addEventListener("click", ()=>{
    loadWeek();
})







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

