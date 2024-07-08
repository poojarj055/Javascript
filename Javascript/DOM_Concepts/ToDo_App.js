//https://www.naukri.com/code360/problems/todolist-removetask_9013565?leftPanelTabValue=SUBMISSION

 // <div id="todoList">
 //    <h1>Simple To-Do List</h1>
 //    <input type="text" id="taskInput" placeholder="Enter task...">
 //    <button id="addTaskBtn">Add Task</button>
 //    <ul id="tasksList"></ul>
 //  </div>


document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput.trim() !== '') {
        const listItem = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = taskInput;
        listItem.appendChild(span);
        document.getElementById('tasksList').appendChild(listItem);
        document.getElementById('taskInput').value = '';
    }
});
