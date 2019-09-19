const Todo = (id, title, description, dueDate, priority) => ({
  id,
  title,
  description,
  dueDate,
  priority,
});
const Project = (id, name) => ({
  id,
  name,
  todos: [],
});

const ProjectList = () => {
  const project = Project(1, 'default');
  project.todos.push(Todo(1, 'title', 'description', '2019-09-20', 'high'));
  const projects = [];
  projects.push(project);
  return (projects);
};


const TodoManager = () => {
  let projectList = ProjectList();

  const setProjects = (projets) => {
    projectList = projets;
  };

  const getProjects = () => projectList;

  const saveToStorage = () => {
    localStorage.setItem('projects', JSON.stringify(getProjects()));
  };

  const getProject = (projectID) => {
    const id = Number(projectID);
    let target = null;
    projectList.some(
      (project) => {
        if (project.id === id) {
          target = project;
          return true;
        }
        return false;
      },
    );
    return target;
  };

  const getTodo = (projectID, todoID) => {
    const project = getProject(projectID);
    const id = Number(todoID);
    let target = null;
    project.todos.some(
      (todo) => {
        if (todo.id === id) {
          target = todo;
          return true;
        }
        return false;
      },
    );
    return target;
  };

  const createNewProject = (name) => {
    const id = projectList[projectList.length - 1].id + 1;
    projectList.push(Project(id, name));
    saveToStorage();
  };

  const deleteProject = (projectID) => {
    const id = Number(projectID);
    if (id === 1) {
      alert('Default project can\'t be deleted');
      return;
    }
    projectList = projectList.filter((item) => {
      if (item.id === id) {
        return false;
      }
      return true;
    });
    saveToStorage();
  };

  const updateProject = (id, name) => {
    const project = getProject(id);
    project.name = name;
    saveToStorage();
  };

  const createNewTodo = (projectID, title, description, dueDate, priority) => {
    const project = getProject(projectID);
    let id = 1;
    if (project.todos.length !== 0) {
      id = project.todos[project.todos.length - 1].id + 1;
    }
    const todo = Todo(id, title, description, dueDate, priority);
    project.todos.push(todo);
    saveToStorage();
  };

  const deleteTodo = (projectID, todoID) => {
    const project = getProject(projectID);
    project.todos = project.todos.filter((item) => {
      if (item.id === todoID) {
        return false;
      }
      return true;
    });
    saveToStorage();
  };


  const updateTodo = (projectID, id, title, description, dueDate, priority) => {
    const todo = getTodo(projectID, id);
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
    saveToStorage();
  };

  return {
    getProject,
    getProjects,
    createNewProject,
    deleteProject,
    updateProject,
    createNewTodo,
    deleteTodo,
    updateTodo,
    setProjects,
  };
};

export default TodoManager;
