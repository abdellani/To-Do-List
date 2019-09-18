let Todo = (id, title, description, dueDate, priority, notes, status) => {
  return {
    id,
    title,
    description,
    dueDate,
    priority,
    notes,
    status
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
  project.todos.push(Todo(1, "title", "description", "dueDate", "priority", "notes", "status"));
  let projects = []
  projects.push(project)
  return (projects)
}


const TodoManager = () => {

  let projectList = ProjectList();

  let getProject = (id) => {
    id=Number(id)
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
  }

  const deleteProject = (id) => {
    projectList = projectList.filter((item) => {
      if (item.id === id) {
        return false
      } else {
        return true
      }
    })
  }

  const updateProject = (id, name) => {
    let project = getProject(id);
    project.name = name;
  }

  const createNewTodo = (projectID, title, description, dueDate, priority, notes, status) => {
    let project = getProject(projectID);
    let id = 1;
    if (project.todos.length !== 0) {
      id = project.todos[project.todos.length - 1].id + 1
    }
    let todo = Todo(id, title, description, dueDate, priority, notes, status)
    project.todos.push(todo)
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
  }


  const updateTodo = (projectID, id, field, value) => {
    let todo = getTodo(projectID, id)
    todo[field] = value
  }

  return {
    getProject,
    getProjects,
    createNewProject,
    deleteProject,
    updateProject,
    createNewTodo,
    deleteTodo,
    updateTodo
  }
}

export default TodoManager