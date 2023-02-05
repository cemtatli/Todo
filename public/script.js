const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const addTodoButton = document.querySelector("#addTodoButton");
const todoFilterForm = document.querySelector("#todoFilterForm");
const todoFilter = document.querySelector("#todoFilter");
const todoList = document.querySelector("#todoList");
const deleteAllButton = document.querySelector("#deleteAllButton");
const todoAlertBox = document.querySelector(".todoAlertBox");
let todos = [];

appRun();

function appRun() {
  todoForm.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadTodos);
  todoList.addEventListener("click", deleteTodo);
  deleteAllButton.addEventListener("click", deleteAllTodos);
  todoFilterForm.addEventListener("keyup", filterTodos);
}
function loadTodos() {
  checkStorage();
  todos.forEach((todo) => {
    AddUI(todo);
  });
}

function filterTodos(event) {
  const filterValue = event.target.value.toLowerCase().trim();
  const todoBoxes = document.querySelectorAll("#todoBox");
  todoBoxes.forEach((todoBox) => {
    const todoText = todoBox.querySelector("#todoText").innerText.toLowerCase().trim();
    if (todoText.indexOf(filterValue) == -1) {
      todoBox.style.display = "none";
    } else {
      todoBox.style.display = "flex";
    }
  });
  alert("warning", "Must have at least one todo to filter !", 500);
}

function deleteAllTodos() {
  if (todoList.children.length == 0) {
    alert("warning", "There is no todo to delete !");
  } else {
    if (confirm("Are you sure you want to delete all todos ?")) {
      while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
      }
      localStorage.removeItem("todos");
      todoList.remove();
      alert("succes", "All todos deleted successfully !", 2000);
    }
  }
}

function deleteTodo(event) {
  if (event.target.classList.contains("ti-trash")) {
    if (confirm("Are you sure you want to delete this todo ?")) {
      const todoBox = event.target.parentElement.parentElement;
      const todoText = todoBox.querySelector("#todoText").innerText;
      todoBox.remove();
      deleteStorage(todoText);
      alert("succes", "Todo deleted successfully !", 1000);
    }
  }
}

function deleteStorage(removeTodo) {
  checkStorage();
  todos.forEach(function (todo, index) {
    if (todo == removeTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(event) {
  const inputValue = todoInput.value.trim();
  if (inputValue == "" || inputValue == null) {
    alert("warning", "Please enter a todo !");
  } else {
    AddUI(inputValue);
    AddStorage(inputValue);
    alert("succes", "Todo added successfully !");
  }
  event.preventDefault(); // Prevents the page from reloading when the form is submitted
}

function AddUI(newTodo) {
  /*             <li class="flex h-12.5 w-full items-center bg-white" id="todoBox">
    <button
      id="todoCompleteButton"
      class="h-full w-25 bg-gradient-to-bl -from--blue -to--darkblue object-fill text-sm font-semibold text-white"
    >
      Complete
    </button>
    <p id="todoText" class="ml-4 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-primary-color">
      Lorem ipsum dolor sit amet.
    </p>
    <button class="group h-full p-4" id="todoDeleteButton">
      <i class="ti ti-trash h-6 w-6 group-hover:-text--red"></i>
    </button>
  </li>  */

  const todoBox = document.createElement("li");
  todoBox.classList.add("flex", "h-12.5", "w-full", "items-center", "bg-white", "radius-start");
  todoBox.setAttribute("id", "todoBox");

  const todoCompleteButton = document.createElement("button");
  todoCompleteButton.classList.add(
    "h-full",
    "sm:w-25",
    "bg-gradient-to-bl",
    "-from--blue",
    "-to--darkblue",
    "sm:text-sm",
    "font-semibold",
    "text-white",
    "w-20",
    "text-xs",
    "radius-start"
  );
  todoCompleteButton.innerText = "Complete";
  const todoText = document.createElement("p");
  todoText.setAttribute("id", "todoText");
  todoText.classList.add(
    "sm:ml-4",
    "ml-2",
    "flex-1",
    "overflow-hidden",
    "text-ellipsis",
    "whitespace-nowrap",
    "md:text-sm",
    "text-xs",
    "font-medium",
    "text-primary-color"
  );
  const toggleComplete = (event) => {
    todoText.classList.toggle("line-through");
    todoCompleteButton.innerText = todoCompleteButton.innerText == "Complete" ? "Undo" : "Complete";
    if (todoCompleteButton.innerText == "Undo") {
      todoCompleteButton.classList.add("-from--pink", "-to--red");
    } else {
      todoCompleteButton.classList.remove("-from--pink", "-to--red");
    }
  };
  todoCompleteButton.addEventListener("click", toggleComplete);
  todoText.innerText = newTodo;

  const todoDeleteButton = document.createElement("button");
  todoDeleteButton.classList.add("group", "h-full", "p-4");

  const todoDeleteIcon = document.createElement("i");
  todoDeleteIcon.classList.add("ti", "ti-trash", "h-6", "w-6", "group-hover:-text--red");
  todoDeleteButton.appendChild(todoDeleteIcon);
  todoBox.appendChild(todoCompleteButton);
  todoBox.appendChild(todoText);
  todoBox.appendChild(todoDeleteButton);
  todoList.appendChild(todoBox);
  todoInput.value = "";
  todoInput.focus();
}

function AddStorage(newTodo) {
  checkStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function alert(type, msg, duration = 300) {
  /*  <div class="my-2 px-8 h-10 chat-bubble text-primary-color font-medium text-sm flex items-center font-medium">msg</div> */
  const alert = document.createElement("div");
  alert.className = ` px-6 my-2 h-10 chat-bubble font-semibold text-sm flex items-center  ${type}`;
  alert.textContent = msg;
  todoAlertBox.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, duration);
}
