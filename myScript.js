// define list as todos.
const todoList = [
  {
    description: "select each",
    done: false,
    id: 1, // Find out delete based on ID instead of index.
  },
  {
    description: "update",
    done: false,
    id: 2,
  },
  {
    description: "delete",
    done: false,
    id: 3,
  },
  {
    description: "Tag",
    done: false,
    id: 4,
  },
];

let binForSelectedItems = [];
let idCounter = 5; // This is to initialize the ID counter.

// Functions Update requires 2 Parameters Select Index, Change Description.
// function updateTodoItem(index, description) {
//   const todoItem = todoList[index];
//   todoItem.description = description;
// }

// Matches the index of todoList array vs binForSelectedItems array via the ID.
function findTodoIndex(id) {
  function checkItemIndex(item) {
    return item.id === parseInt(id);
  }

  // Use Array Find Methods: findIndex().
  return todoList.findIndex(checkItemIndex);
}

// Function Update requires 2 Parameters; Select ID and a new Description.
function updateTodoItem(id, newDescription) {
  const index = findTodoIndex(id);
  const todoItem = todoList[index];
  todoItem.description = newDescription;
}

// Function Delete requires 1 Parameter: Select id.
function deleteTodoItem(id) {
  const index = findTodoIndex(id);
  todoList.splice(index, 1); // before splicing use array function called "find index" method.
}

// Function Toggle done requires 1 Parameters: Select Index/id
function toggleDone(id) {
  const index = findTodoIndex(id);
  const todoItem = todoList[index];
  todoItem.done = !todoItem.done;
  console.log(todoItem);
}
// Function Add Task requires 1 Parameter: Add new Description
function addTodoItem(description) {
  const newTodoItem = {
    description: description,
    done: false,
    id: idCounter, // Assign the current ID
  };
  todoList.push(newTodoItem);
  idCounter++;
}
// Function Toggle(Negation: Push if wala, Splice if naa)
// Select Items into an array requires 1 Parameter: Select Index
function toggleSelectedTodoItems(todoID) {
  if (binForSelectedItems.includes(todoID)) {
    const index = binForSelectedItems.indexOf(todoID);
    binForSelectedItems.splice(index, 1);
  } else {
    binForSelectedItems.push(todoID);
  }
}
// Function for multiple delete
function emptyBin() {
  // for (let index = binForSelectedItems.length - 1; index >= 0; index--) {
  //   deleteTodoItem(binForSelectedItems[index]);
  // }
  while (binForSelectedItems.length !== 0) {
    const todoID = binForSelectedItems.pop();
    deleteTodoItem(todoID);
  }
  // binForSelectedItems = []; // needed for "for loop".
}
// Function for multiple done.
function toggleDoneBin() {
  for (let id = binForSelectedItems.length; id >= 1; id--) {
    toggleDone(id)
  }
  // while (binForSelectedItems.length !== 0) {
  //   const todoID = binForSelectedItems.pop();
  //   toggleDone(todoID);
  // }
}

// HTML part (render todoList) with functioning buttons.ms

// Creating a list element and appending Checkbox and parent.
function createItemElement(parent, description, id, isDone=false) {
  const listItem = document.createElement("li");
  listItem.className = "todo-item";
  // const penIcon = document.createElement("span");
  // penIcon.textContent = "🖊️";
  // listItem.addEventListener("mouseover", (e) => {
  //   listItem.appendChild(penIcon);
  // });
  // listItem.addEventListener("mouseleave", (e) => {
  //   listItem.removeChild(penIcon);
  // });

  // Creating the Checkbox.
  const checkbox = document.createElement("input");
  //   console.log(binForSelectedItems.includes(id.toString()));
  checkbox.checked = binForSelectedItems.includes(id.toString());
  checkbox.type = "checkbox";
  checkbox.value = id;
  checkbox.name = description.replaceAll(" ", "_");
  checkbox.addEventListener("change", function (e) {
    toggleSelectedTodoItems(this.value);
  });

  // Making innerText editable under a span element.
  // Creating a span for the innerText which is assigned to "text".
  const text = document.createElement("span");

  text.className = "text-editable";
  if (isDone)  text.className += " done";

  text.innerText = description;
  text.setAttribute("contentEditable", true);
  text.addEventListener("input", (e) => {
    const newDescription = e.target.innerText;
    updateTodoItem(id, newDescription);
  });
  text.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.code == "Enter" || e.code == "NumpadEnter") {
      e.preventDefault();
    }
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(text);
  parent.appendChild(listItem);
}

// Render todo items using sample data.
const todoListElement = document.getElementById("todo-list");
function renderList() {
  todoListElement.innerHTML = "";
  todoList.forEach((item) => {
    createItemElement(todoListElement, item.description, item.id, item.done);
  });
}

// Form DOM reference
const todoFormElement = document.getElementById("todo-form");
todoFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoInputElement = document.getElementById("new-todo-input");
  const inputValue = newTodoInputElement.value;
  addTodoItem(inputValue);
  newTodoInputElement.value = "";
  renderList();
});

const removeTaskButtonElement = document.getElementById("remove-task-button");
removeTaskButtonElement.addEventListener("click", function (e) {
  emptyBin();
  renderList();
});

const toggleDoneTaskButtonElement = document.getElementById(
  "toggle-done-task-button"
);
toggleDoneTaskButtonElement.addEventListener("click", (e) => {
  toggleDoneBin();
  renderList();
});

renderList();
