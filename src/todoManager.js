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


// let todoStructure = [{
//   "id": "1",
//   "project_name": "default",
//   "todos": [{
//     "id": "1",
//     "title": "title",
//     "description": "description",
//     "dueDate": "date",
//     "priority": "integer",
//     "notes": "notes",
//     "status": "boolean"
//   }]
// }, ]

const TodoManager = () => {

  let projectList = ProjectList();

  let getProject = (id) => {
    let target=null;
    projectList.some(
      (project) => {
        console.log(`project.id = ${project.id}`)
        if (project.id === id) {
          target=project;
          return true;
        }
      }
    )
    return target;
  }
  let getProjects=()=>{
    return projectList;
  }
  let createNewProject = (name) => {
    let id = projectList[projectList.length - 1].id + 1;
    projectList.push(Project(id, name))
  }
  /*
      getListOfProject()
      createNewProject(title)
      deleteProject(id)
      updateProjectName(id,name)
  */

  /*
      //todos
      getListOfTodos(projectID)
      createNewTodoProejct(projectID,Todo)
 */
  return {
    getProject,
    getProjects,
    createNewProject
  }
}

todoManager = TodoManager()
todoManager.createNewProject("new project ")
