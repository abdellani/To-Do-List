import createElement from "./helpers"

const DomManager = (todoManager) => {
  let selectProjectToShow = document.getElementById("projects-list")
  let selectProjectAddForm = document.getElementById("select-project-add-form")
  let todoList = document.getElementById("todo-list")
  let newProjectName = document.getElementById("new-project-name")
  let addNewProjectBotton = document.getElementById("new-project-submit")
  let addNewTodoBotton = document.getElementById("new-todo-submit")

  let newTodoTitle = document.getElementById("new-todo-title").value
  let newTodoDescription = document.getElementById("new-todo-description").value
  let newTodoDueDate = document.getElementById("new-todo-dueDate").value
  let newTodoPriority = document.getElementById("new-todo-priority").value
  let newTodoNotes = document.getElementById("new-todo-notes").value

  
  const initalize = () => {
    selectProjectToShow.addEventListener("change", () => {
      let projectId = getSelecterProjectToShow()
      loadTodosList(projectId)
    })
    addNewProjectBotton.addEventListener("click", (event) => {
      event.preventDefault();
      createNewProject()
    })
    addNewTodoBotton.addEventListener("click", (event) => {
      event.preventDefault();
      let projectID=getSelecterProjectToAdd()
      
      createNewTodo(projectID,newTodoTitle,newTodoDescription,newTodoDueDate,newTodoPriority,newTodoNotes,false/*status*/)

    })
  }
  const render = () => {
    loadProjectsList()
    loadTodosList(getSelecterProjectToShow())
  }
  let getSelecterProjectToShow=()=>{
    return selectProjectToShow.options[selectProjectToShow.selectedIndex].value
  }
  let getSelecterProjectToAdd=()=>{
    return selectProjectAddForm.options[selectProjectAddForm.selectedIndex].value
  }

  let loadProjectsList = () => {
    selectProjectToShow.innerHTML = "";
    selectProjectAddForm.innerHTML = "";

    let projects = todoManager.getProjects()
    projects.forEach((project) => {
      selectProjectToShow.appendChild(createElement("option", project.name, project.id))
      selectProjectAddForm.appendChild(createElement("option", project.name, project.id))
    })
  }
  let loadTodosList = (projectID) => {
    todoList.innerHTML = ""
    let project = todoManager.getProject(projectID)
    project.todos.forEach((todo) => {
      let todoDiv = createElement("div", null, null, "todo")
      todoDiv.appendChild(createElement("div", todo.title, null, "title"))
      todoDiv.appendChild(createElement("div", todo.description, null, "description"))
      todoDiv.appendChild(createElement("div", todo.dueDate, null, "date"))
      todoList.appendChild(todoDiv)
    })
  }
  let createNewProject = () => {
    todoManager.createNewProject(newProjectName.value)
    newProjectName.value=""
    render()
  }
  const createNewTodo=(projectID, title, description, dueDate, priority, notes, status)=>{
    todoManager.createNewTodo(projectID, title, description, dueDate, priority, notes, status)
    loadTodosList(getSelecterProjectToShow())
  }

  return {
    render,
    createNewProject,
    initalize
  }
}

export default DomManager;