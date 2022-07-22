import { deleteTask } from "./deleteTask.js";

async function getTasks() {
    const tasks = await fetch('/.netlify/functions/tasks')
        .then((response) => response.json())

    console.log(tasks);

    const container = document.querySelector('.tasks');
    const template = document.querySelector('#task-template');


    tasks.forEach((item) => {
        const element = template.content.cloneNode(true);

        const taskElement = element.querySelector('.task-item');
        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        editBtn.setAttribute("targetID", item.id);


        taskElement.innerText = item.task;
        taskElement.setAttribute("item-id", item.id);


        deleteBtn.setAttribute("id", item.id);

        // Delete Task
        deleteBtn.onclick = function (e) {
            console.log("h2 was clicked: " + e.currentTarget.getAttribute("id"));
            deleteTask(e.currentTarget.getAttribute("id"));
        }


        // Update Task
        editBtn.onclick = function (e) {
            const targetID = e.currentTarget.getAttribute("targetID");
            const editElement = document.querySelector(`[item-id='${targetID}']`);

            const inputElement = document.createElement("input");
            inputElement.setAttribute('type', 'text');
            inputElement.value = editElement.innerText;

            const saveBtn = document.createElement("button");
            saveBtn.innerText = "Save";
            saveBtn.setAttribute("class", "saveItem");
            taskElement.after(saveBtn);

            // Edit task
            saveBtn.onclick = function (e) {
                console.log('clicked');
                fetch('/.netlify/functions/update-task', {
                    method: 'POST',
                    body: JSON.stringify({
                        id: targetID,
                        task: inputElement.value
                    })
                })
                    .then(function (response) {
                        if (response.statis = 200) {
                            window.location.reload();
                        }
                    });
            }


            editElement.replaceWith(inputElement);
        }





        container.appendChild(element);
    });

}



getTasks();