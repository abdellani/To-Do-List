import createElement from "./helpers"

const DomManager = (todoManager) => {
  let selectProjectToShow = document.getElementById("projects-list")
  let selectProjectAddForm = document.getElementById("select-project-add-form")
  let todoList = document.getElementById("todo-list")
  let newProjectName = document.getElementById("new-project-name")
  let addNewProjectBotton = document.getElementById("new-project-submit")
  let addNewTodoBotton = document.getElementById("new-todo-submit")
  let todoHeader = document.getElementById("todoHeader")
  let editBackButton = document.getElementById('editBackButton')
  let deleteProjectButton = document.getElementById('deleteProject')

  let newTodoTitle = document.getElementById("new-todo-title")
  let newTodoDescription = document.getElementById("new-todo-description")
  let newTodoDueDate = document.getElementById("new-todo-dueDate")
  let newTodoPriority = document.getElementById("new-todo-priority")
  let todoIdHolder = document.getElementById("todoIdHolder")


  const initalize = () => {
    selectProjectToShow.addEventListener("change", () => {
      let projectId = getSelecterProjectToShow()
      loadTodosList(projectId)
    })

    deleteProjectButton.addEventListener('click', (event) => {
      event.preventDefault()
      let projectId = getSelecterProjectToShow()
      todoManager.deleteProject(projectId)
      render()
    })

    editBackButton.addEventListener('click', (event) => {
      event.preventDefault()
      editBackButton.classList.add('hidden')
      emptyForm()
      todoHeader.innerText = 'CREATE NEW TODO'
      addNewTodoBotton.innerText = 'Create'
    })
    addNewProjectBotton.addEventListener("click", (event) => {
      event.preventDefault();
      createNewProject()
    })
    addNewTodoBotton.addEventListener("click", (event) => {
      event.preventDefault();
      let projectID = getSelecterProjectToAdd()
      let todoID = todoIdHolder.value

      if (newTodoTitle.value == '') {
        alert('Title cannot be empty!!')
        return
      } else if (!(/([^\s])/.test(newTodoTitle.value))) {
        alert('You are cheating now, no spaces on first character!')
        return
      }
      if (addNewTodoBotton.innerText == 'Create') {
        createNewTodo(projectID, newTodoTitle.value, newTodoDescription.value, newTodoDueDate.value, newTodoPriority.options[newTodoPriority.selectedIndex].value)
        emptyForm()
      } else {
        projectID = todoIdHolder.dataset.projectID
        todoManager.updateTodo(projectID, todoID, newTodoTitle.value, newTodoDescription.value, newTodoDueDate.value, newTodoPriority.options[newTodoPriority.selectedIndex].value)

        emptyForm()
        editBackButton.classList.add('hidden')
        todoHeader.innerText = 'CREATE NEW TODO'
        addNewTodoBotton.innerText = 'Create'
        render()
      }
    })
  }
  const render = () => {
    loadProjectsList()
    loadTodosList(getSelecterProjectToShow())
  }
  let getSelecterProjectToShow = () => {
    return selectProjectToShow.options[selectProjectToShow.selectedIndex].value
  }
  let getSelecterProjectToAdd = () => {
    return selectProjectAddForm.options[selectProjectAddForm.selectedIndex].value
  }

  const emptyForm = () => {
    newTodoTitle.value = ''
    newTodoDescription.value = ''
    newTodoDueDate.value = ''
    newTodoPriority.selectedIndex = 0
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
      if (todo.priority == 'high') {
        todoDiv.classList.add('high-priority')
      }
      todoDiv.appendChild(createElement("div", todo.title, null, "title"))
      todoDiv.appendChild(createElement("div", todo.description, null, "description"))
      todoDiv.appendChild(createElement("div", todo.dueDate, null, "date"))
      let button = createElement("button", 'delete', null, null)
      button.addEventListener('click', () => {
        todoManager.deleteTodo(projectID, todo.id)
        loadTodosList(projectID)
        render()
      })

      let buttonEdit = createElement("button", 'edit', null, null)
      buttonEdit.addEventListener('click', () => {
        newTodoTitle.value = todo.title
        newTodoDescription.value = todo.description
        newTodoDueDate.value = todo.dueDate
        newTodoPriority.value = todo.priority
        todoIdHolder.value = todo.id
        todoIdHolder.dataset.projectID = projectID
        editBackButton.classList.remove('hidden')
        todoHeader.innerText = 'EDIT THIS TODO'
        addNewTodoBotton.innerText = 'Edit'
      })
      todoDiv.appendChild(button)
      todoDiv.appendChild(buttonEdit)
      todoList.appendChild(todoDiv)
    })
  }
  let createNewProject = () => {
    todoManager.createNewProject(newProjectName.value)
    newProjectName.value = ""
    render()
  }
  const createNewTodo = (projectID, title, description, dueDate, priority) => {
    todoManager.createNewTodo(projectID, title, description, dueDate, priority)
    loadTodosList(getSelecterProjectToShow())
  }


  return {
    render,
    createNewProject,
    initalize
  }
}

export default DomManager;