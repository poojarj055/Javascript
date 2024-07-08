Start
  |
  v
User Enters Task (in Input Field)
  |
  v
Click "Add Task" Button
  |
  v
Is Input Empty?
  |
  v
No                          Yes
 |                            |
 v                            v
Create <li> Element        Do Nothing
  |
  v
Create <span> Element and Set Text to Input Value
  |
  v
Append <span> to <li>
  |
  v
Create "Remove" Button
  |
  v
Set Button Click Handler to removeTask Function
  |
  v
Append Button to <li>
  |
  v
Append <li> to <ul> (Task List)
  |
  v
Clear Input Field
  |
  v
End


 // <div id="todoList">
 //    <h1>Simple To-Do List</h1>
 //    <input type="text" id="taskInput" placeholder="Enter task...">
 //    <button id="addTaskBtn">Add Task</button>
 //    <ul id="tasksList"></ul>
 //  </div>


document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput').value;  // Step 1: Retrieve the input value
    if (taskInput.trim() !== '') {  // Check if the input is not empty
        const listItem = document.createElement('li');  // Step 2: Create <li> element
        const span = document.createElement('span');  // Step 3: Create <span> element
        span.textContent = taskInput;  // Set <span> text to input value
        listItem.appendChild(span);  // Step 4: Append <span> to <li>

        const removeButton = document.createElement('button');  // Step 5: Create <button> element
        removeButton.textContent = 'Remove';  // Set button text to "Remove"
        removeButton.className = 'removeBtn';  // Add class for styling
        removeButton.setAttribute('onclick', 'removeTask(this)');  // Set onclick attribute

        listItem.appendChild(removeButton);  // Step 7: Append button to <li>
        document.getElementById('tasksList').appendChild(listItem);  // Step 8: Append <li> to <ul>

        document.getElementById('taskInput').value = '';  // Step 9: Clear the input field
    }
});

function removeTask(taskElement) {
    const listItem = taskElement.parentElement;  // Step 1: Retrieve the parent <li> of the button
    listItem.parentElement.removeChild(listItem);  // Step 2: Remove the <li> from its parent <ul>
}


Flow When Removing a Task:
--------------------------
Click "Remove" Button

Steps:
1. removeTask function is called with the button element.
2. Retrieve the parent <li> of the button.
3. Remove the <li> from its parent (<ul id="tasksList">).


