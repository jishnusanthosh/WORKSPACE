import "./style.css"

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list =
  document.querySelector<HTMLUListElement>("#list")

const form =
  document.querySelector<HTMLFormElement>(
    "#new-task-form"
  )

const input =
  document.querySelector<HTMLInputElement>(
    "#new-task-title"
  )

const tasks: Task[] = loadTasks()

tasks.forEach(addListItem)

form?.addEventListener("submit", (event) => {
  event.preventDefault()

  if (!input) {
    return
  }

  const title = input.value.trim()

  if (title === "") {
    return
  }

  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: new Date(),
  }

  tasks.push(newTask)

  addListItem(newTask)

  saveTasks()

  input.value = ""
})

function addListItem(task: Task): void {
  const item =
    document.createElement("li")

  const label =
    document.createElement("label")

  const checkbox =
    document.createElement("input")

  const deleteButton =
    document.createElement("button")

  checkbox.type = "checkbox"

  checkbox.checked =
    task.completed

  checkbox.addEventListener(
    "change",
    () => {
      task.completed =
        checkbox.checked

      saveTasks()
    }
  )

  const taskText =
    document.createElement("span")

  taskText.textContent =
    task.title

  deleteButton.textContent =
    "Delete"

  deleteButton.type =
    "button"

  deleteButton.addEventListener(
    "click",
    () => {
      deleteTask(task.id)
    }
  )

  label.append(
    checkbox,
    taskText
  )

  item.append(
    label,
    deleteButton
  )

  list?.append(item)
}

function deleteTask(
  taskId: string
): void {
  const taskIndex =
    tasks.findIndex(
      (task) =>
        task.id === taskId
    )

  if (taskIndex === -1) {
    return
  }

  tasks.splice(
    taskIndex,
    1
  )

  saveTasks()

  renderTasks()
}

function renderTasks(): void {
  if (!list) {
    return
  }

  list.innerHTML = ""

  tasks.forEach(
    addListItem
  )
}

function saveTasks(): void {
  localStorage.setItem(
    "TASKS",
    JSON.stringify(tasks)
  )
}

function loadTasks(): Task[] {
  const taskJSON =
    localStorage.getItem(
      "TASKS"
    )

  if (taskJSON === null) {
    return []
  }

  try {
    const parsedTasks =
      JSON.parse(
        taskJSON
      ) as Array<{
        id: string
        title: string
        completed: boolean
        createdAt: string
      }>

    return parsedTasks.map(
      (task) => ({
        ...task,

        createdAt:
          new Date(
            task.createdAt
          ),
      })
    )
  } catch (error) {
    console.error(
      "Failed to load tasks:",
      error
    )

    return []
  }
}