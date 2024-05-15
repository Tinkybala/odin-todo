import {Todo} from './todo';
const content = document.querySelector("#content");

function loadAll(){
    //create heading
    const header = document.createElement("h2");
    header.textContent = "All Tasks";
    content.appendChild()
    for(let i=0; i < localStorage.length; i++){
        let projectName = localStorage.key(i);
        let project = JSON.parse(localStorage.getItem(projectName));

        for(let j=0; j < project.length; j++){
            let todo = Todo(project[i].title, project[i].description, project[i].dueDate, project[i].priority);

            //create a div with information
            const button = document.createElement("button");
            const container = document.createElement("span");
            const title = document.createElement("p");
            const date = document.createElement("p")
            
            title.textContent = todo.getTitle();
            date.textContent = todo.getDueDate();
            container.appendChild(title);
            container.appendChild(date);
            button.appendChild(container);

            content.appendChild(button);
        }
    }
}

export {loadAll};