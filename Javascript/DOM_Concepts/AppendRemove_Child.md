Concepts
1. Appending a Child (appendChild)

Concept:

Appending a child means adding an element to another element as its child. In the DOM, elements are structured in a tree-like manner. 
When you append a child, you're adding it to the tree under a specific parent.
Example:
```
let parentElement = document.getElementById('tasksList');
let childElement = document.createElement('li');
parentElement.appendChild(childElement);
```
In this example, childElement (a new <li> element) is added as a child to parentElement (the <ul> with ID tasksList).

2. Removing a Child (removeChild)

Concept:

Removing a child means taking an element out of its parent element, thus removing it from the DOM.
Example:
```
let parentElement = document.getElementById('tasksList');
let childElement = document.getElementById('someChildElementId');
parentElement.removeChild(childElement);

```
In this example, childElement is removed from parentElement.

3. Parent Element

Concept:

A parent element is any element that contains other elements. In the DOM, elements are nested, 
and the containing element is called the parent.
Example:
```
html
Copy code
<ul id="tasksList">
  <li id="someChildElementId">Task 1</li>
</ul>
```
Here, the <ul> with ID tasksList is the parent element of the <li> with ID someChildElementId.
