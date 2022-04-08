if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js", { scope: "/" })
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

let todos = !window.localStorage.getItem("data")
  ? []
  : JSON.parse(window.localStorage.getItem("data"));

const todoList = document.getElementById("todos");
const todoItem = ({ name, id, completed }) =>
  `<span ${completed && 'id="completedTodo"'}>
<div class="todo">
  <h2 class="todoTitle">${name}</h2>
  <div>
    <button onclick="complete(${id})" id="complete" class="todoButton">&#10003;</button>
    <button onclick="del(${id})" id="delete" class="todoButton">x</button>
  </div>
</div>
</span>`;

const mapped = () => {
  todoList.innerHTML = todos
    .map((todo) => {
      return todoItem(todo);
    })
    .join("");
};

mapped();

const add = () => {
  const name = document.getElementById("name").value;
  if (name !== "") {
    todos.push({
      id: todos.length + 1,
      name: name,
      completed: false,
    });
    mapped();
    window.localStorage.setItem("data", JSON.stringify(todos));
  } else {
    todoList.innerHTML += `<p>Enter the name !1!</p>`;
  }
};

const del = (props) => {
  const filtered = todos.filter((t) => t.id !== props);
  todos = filtered;
  mapped();
  window.localStorage.setItem("data", JSON.stringify(filtered));
};

const complete = (props) => {
  const item = todos.find((t) => t.id === props);
  item.completed ? (item.completed = false) : (item.completed = true);
  mapped();
  window.localStorage.setItem("data", JSON.stringify(todos));
};

document.getElementById("add").onclick = add;
