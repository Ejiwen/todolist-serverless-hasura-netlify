async function newTask(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get("task"));
    const result = await fetch("/.netlify/functions/add-task", {
        method: "POST",
        body: JSON.stringify({
            id: data.get("id"),
            task: data.get("task")
        })
    }).then((response)=>{
        document.querySelector(".message").innerText = `Response: ${response.status}`;
        window.location.reload();
    });
}
document.querySelector("#task-form").addEventListener("submit", newTask);

//# sourceMappingURL=index.0c2c9ac1.js.map
