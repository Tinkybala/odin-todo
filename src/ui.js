import {Todo} from './todo';
const content = document.querySelector("#content");
import {addItem, removeItem, getAllTodos, getTodos, modifyItem} from "./project";

//function to load all todos from all projects
function loadAll(){


    //remove existing
    const toRemove = Array.from(document.querySelectorAll(".inner > button"));
    toRemove.forEach(element =>{
        element.parentNode.removeChild(element);
    })

    //change heading
    const header = document.querySelector(".content-title");
    header.textContent = "All Tasks";

    //loop through projects
    for(let i=0; i < localStorage.length; i++){
        let projectName = localStorage.key(i);
        let project = JSON.parse(localStorage.getItem(projectName));

        for(let j=0; j < project.length; j++){
            let todo = Todo(project[j].title, project[j].description, project[j].dueDate, project[j].priority);

            //create buttons with information
            let button = document.createElement("button");
            let container = document.createElement("span");
            let miniContainer = document.createElement("span");
            let title = document.createElement("form");
            let titleInput = document.createElement("input");
            let date = document.createElement("p");
            let deleteButton = document.createElement("button");
            
            container.classList.add("task-content");
            button.classList.add("task-button");
            deleteButton.classList.add("delete-button");
            
            titleInput.setAttribute("type", "text");
            titleInput.setAttribute("value", todo.getTitle());
            titleInput.setAttribute("name", todo.getTitle());
            titleInput.setAttribute("id", todo.getTitle());
            titleInput.classList.add("task-title");
            title.appendChild(titleInput);


            date.textContent = todo.getDueDate();
            deleteButton.textContent = "delete";
            container.appendChild(title);
            miniContainer.appendChild(date);
            miniContainer.appendChild(deleteButton);
            container.appendChild(miniContainer);
            button.appendChild(container);

            const inner = document.querySelector(".inner");
            inner.appendChild(button);

            //delete button clicked
            deleteButton.addEventListener("click", ()=>{
                removeItem(projectName, j);
                loadAll();
                insertTodoButton(projectName);
            })

            //title update submit
            title.addEventListener("submit", (e)=>{
                e.preventDefault();
                
                const newTitle = document.getElementById(todo.getTitle()).value;
                modifyItem(projectName, j, "title", newTitle);
                document.activeElement.blur();
            })

            //click outside form
            title.addEventListener("focusout", ()=>{
                const newTitle = document.getElementById(todo.getTitle()).value;
                modifyItem(projectName, j, "title", newTitle);
            })
        }
    }
}

//load todos from a specific project
const load = function(projectName){
    //remove existing
    const toRemove = Array.from(document.querySelectorAll(".inner > button"));
    toRemove.forEach(element =>{
        element.parentNode.removeChild(element);
    })

    //change heading
    const header = document.querySelector(".content-title");
    header.textContent = projectName;


    const project = JSON.parse(localStorage.getItem(projectName));
    for(let j=0; j < project.length; j++){
        let todo = Todo(project[j].title, project[j].description, project[j].dueDate, project[j].priority);

        //create buttons with information
        let button = document.createElement("button");
        let container = document.createElement("span");
        let miniContainer = document.createElement("span");
        let title = document.createElement("form");
        let titleInput = document.createElement("input");
        let date = document.createElement("p");
        let deleteButton = document.createElement("button");
        
        container.classList.add("task-content");
        button.classList.add("task-button");
        deleteButton.classList.add("delete-button");
        
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("value", todo.getTitle());
        titleInput.setAttribute("name", todo.getTitle());
        titleInput.setAttribute("id", todo.getTitle());
        titleInput.classList.add("task-title");
        title.appendChild(titleInput);


        date.textContent = todo.getDueDate();
        deleteButton.textContent = "delete";
        container.appendChild(title);
        miniContainer.appendChild(date);
        miniContainer.appendChild(deleteButton);
        container.appendChild(miniContainer);
        button.appendChild(container);

        const inner = document.querySelector(".inner");
        inner.appendChild(button);

        //delete button clicked
        deleteButton.addEventListener("click", ()=>{
            removeItem(projectName, j);
            load(projectName);
            insertTodoButton(projectName);
        })

        //title update submit
        title.addEventListener("submit", (e)=>{
            e.preventDefault();
            
            const newTitle = document.getElementById(todo.getTitle()).value;
            modifyItem(projectName, j, "title", newTitle);
            document.activeElement.blur();
        })

        //click outside form
        title.addEventListener("focusout", ()=>{
            const newTitle = document.getElementById(todo.getTitle()).value;
            modifyItem(projectName, j, "title", newTitle);
        })
    }
}


//function to insert add todo button
const insertTodoButton = function(projectName = "all"){
    const inner = document.querySelector(".inner");
    const form = document.querySelector(".todo-form");
    const addTodoButton = document.createElement("button");
    addTodoButton.classList.add("add-todo-button");

     //add project button clicks
     addTodoButton.addEventListener("click", ()=>{
        addTodoClick(projectName);
    })

    //No existing todos
    if(form === null){
        addTodoButton.textContent = "Add Task";
        addTodoButton.setAttribute("type", "button");
        inner.appendChild(addTodoButton);
    }

    //When add button is clicked in form
    else{
        console.log("existing todo");
        //remove form
        inner.removeChild(form);
        if(projectName === "all"){
            loadAll();
        }
        else{
            load(projectName);
        }
        //insert add todo button
        addTodoButton.textContent = "Add Task";
        addTodoButton.setAttribute("type", "button");
        inner.appendChild(addTodoButton);
    }   
}

//add todo button clicked
const addTodoClick = function(project = "all"){
    console.log(project);
    const inner = document.querySelector(".inner");
    const addTodoButton = document.querySelector(".add-todo-button");

    //remove add projects button and replace with form
    inner.removeChild(addTodoButton);
    const form = document.createElement("form");
    form.classList.add("todo-form");
    //when form is submitted
    form.addEventListener("submit", (e)=>{
        e.preventDefault();

        let projectName = project;
        if(project === "all") projectName = document.getElementById("project-name").value;
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let dueDate = document.getElementById("due-date").value;
        let priority = document.getElementById("priority").value;
        const todo = Todo(title, description, dueDate, priority);
        addItem(projectName, todo);
        console.log(projectName);
        insertTodoButton(project);
    })

    //text input
    let projectName;
    if(project === "all") projectName = document.createElement("input");
    const title = document.createElement("input");
    const description = document.createElement("input");
    const dueDate = document.createElement("input");
    const priority = document.createElement("input");

    //labels
    let projectNameLabel;
    if(project === "all") projectNameLabel = document.createElement("label");
    const titleLabel = document.createElement("label")
    const descriptionLabel = document.createElement("label")
    const dueDateLabel = document.createElement("label")
    const priorityLabel = document.createElement("label")

    //setting attributes for input
    if(project === "all"){
        projectName.setAttribute("type", "text");
        projectName.setAttribute("name", "project-name");
        projectName.setAttribute("id", "project-name");
    }
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("id", "title");
    description.setAttribute("type", "text");
    description.setAttribute("name", "description");
    description.setAttribute("id", "description");
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("name", "due-date");
    dueDate.setAttribute("id", "due-date");
    priority.setAttribute("type", "text");
    priority.setAttribute("name", "priority");
    priority.setAttribute("id", "priority");

    //setting attributes for label
    if(project === "all"){
        projectNameLabel.setAttribute("for", "project-name");
        projectNameLabel.textContent = "Project: "
    }
    titleLabel.setAttribute("for", "title");
    descriptionLabel.setAttribute("for", "description");
    dueDateLabel.setAttribute("for", "due-date");
    priorityLabel.setAttribute("for", "priority");
    titleLabel.textContent = "Title: ";
    descriptionLabel.textContent = "Description: ";
    dueDateLabel.textContent = "Due Date: ";
    priorityLabel.textContent = "Priority: ";

    if(project === "all"){
        form.appendChild(projectNameLabel);
        form.appendChild(projectName);
    }
    form.appendChild(titleLabel);
    form.appendChild(title);
    form.appendChild(descriptionLabel);
    form.appendChild(description)
    form.appendChild(dueDateLabel);
    form.appendChild(dueDate);
    form.appendChild(priorityLabel);
    form.appendChild(priority);

    //submit and cancel buttons
    const addButton = document.createElement("button");
    const cancelButton = document.createElement("button");
    addButton.textContent = "Add";
    cancelButton.textContent = "Cancel";
    form.appendChild(addButton);
    form.appendChild(cancelButton);

    addButton.setAttribute("type", "submit");
    addButton.classList.add("add-button");

    cancelButton.setAttribute("type", "button");
    cancelButton.classList.add("cancel-button");

    //cancel button clicked
    cancelButton.addEventListener("click", ()=>{
        insertTodoButton(project);
    })

    inner.appendChild(form);    
}

export {loadAll, load, insertTodoButton, addTodoClick};