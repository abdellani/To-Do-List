let Todo = (id, title, description, dueDate, priority) => {
  return {
    id,
    title,
    description,
    dueDate,
    priority
  }
}
let Project = (id, name) => {
  return {
    id,
    name,
    todos: []
  }
}

let ProjectList = () => {
  let project = Project(1, "default");
  project.todos.push(Todo(1, "title", "description", '2019-09-20', "high"));
  let projects = []
  projects.push(project)
  return (projects)
}


const TodoManager = () => {

  let projectList = ProjectList();

  const setProjects = (projets) => {
    projectList = projets
  }

  const saveToStorage = () => {
    localStorage.setItem('projects', JSON.stringify(getProjects()))
  }

  let getProject = (id) => {
    id = Number(id)
    let target = null;
    projectList.some(
      (project) => {
        if (project.id === id) {
          target = project;
          return true;
        }
      }
    )
    return target;
  }
  let getProjects = () => {
    return projectList;
  }

  let getTodo = (projectID, id) => {
    let project = getProject(projectID);
    id = Number(id)
    let target = null;
    project.todos.some(
      (todo) => {
        if (todo.id === id) {
          target = todo;
          return true;
        }
      }
    )
    return target;
  }

  let createNewProject = (name) => {
    let id = projectList[projectList.length - 1].id + 1;
    projectList.push(Project(id, name))
    saveToStorage()
  }

  const deleteProject = (id) => {
    id = Number(id)
    if (id == 1) {
      alert(`Default project can't be deleted`)
      return
    }
    projectList = projectList.filter((item) => {
      if (item.id === id) {
        return false
      } else {
        return true
      }
    })
    saveToStorage()
  }

  const updateProject = (id, name) => {
    let project = getProject(id);
    project.name = name;
    saveToStorage()
  }

  const createNewTodo = (projectID, title, description, dueDate, priority) => {
    let project = getProject(projectID);
    let id = 1;
    if (project.todos.length !== 0) {
      id = project.todos[project.todos.length - 1].id + 1
    }
    let todo = Todo(id, title, description, dueDate, priority)
    project.todos.push(todo)
    saveToStorage()
  }

  const deleteTodo = (projectID, todoID) => {
    let project = getProject(projectID);
    project.todos = project.todos.filter((item) => {
      if (item.id === todoID) {
        return false
      } else {
        return true
      }
    })
    saveToStorage()
  }


  const updateTodo = (projectID, id, title, description, dueDate, priority) => {
    let todo = getTodo(projectID, id)
    todo.title = title
    todo.description = description
    todo.dueDate = dueDate
    todo.priority = priority
    saveToStorage()
  }

  return {
    getProject,
    getProjects,
    createNewProject,
    deleteProject,
    updateProject,
    createNewTodo,
    deleteTodo,
    updateTodo,
    setProjects
  }
}

export default TodoManager