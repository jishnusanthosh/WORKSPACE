const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add-btn");


function addTask() {
  const task = inputBox.value.trim();

  if (task === "") {
    alert("You must write something");
    return;
  }

  const li = document.createElement("li");

  li.textContent = task;

  const span = document.createElement("span");

  span.innerHTML = "\u00d7";

  li.appendChild(span);

  listContainer.appendChild(li);

  inputBox.value = "";

  saveData();
}


addButton.addEventListener("click", addTask);


inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});


listContainer.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");

      saveData();
    } else if (event.target.tagName === "SPAN") {
      event.target.parentElement.remove();

      saveData();
    }
  },
  false
);


function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}


function showTask() {
  const savedData = localStorage.getItem("data");

  if (savedData) {
    listContainer.innerHTML = savedData;
  }
}


showTask();