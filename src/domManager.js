import createElement from './helpers';

const DomManager = (todoManager) => {
  const selectProjectToShow = document.getElementById('projects-list');
  const selectProjectAddForm = document.getElementById('select-project-add-form');
  const todoList = document.getElementById('todo-list');
  const newProjectName = document.getElementById('new-project-name');
  const addNewProjectBotton = document.getElementById('new-project-submit');
  const addNewTodoBotton = document.getElementById('new-todo-submit');
  const todoHeader = document.getElementById('todoHeader');
  const editBackButton = document.getElementById('editBackButton');
  const deleteProjectButton = document.getElementById('deleteProject');

  const newTodoTitle = document.getElementById('new-todo-title');
  const newTodoDescription = document.getElementById('new-todo-description');
  const newTodoDueDate = document.getElementById('new-todo-dueDate');
  const newTodoPriority = document.getElementById('new-todo-priority');
  const todoIdHolder = document.getElementById('todoIdHolder');


  const getSelecterProjectToShow = () => selectProjectToShow.options[
    selectProjectToShow.selectedIndex].value;
  const getSelecterProjectToAdd = () => selectProjectAddForm.options[
    selectProjectAddForm.selectedIndex].value;
  const loadProjectsList = () => {
    selectProjectToShow.innerHTML = '';
    selectProjectAddForm.innerHTML = '';

    const projects = todoManager.getProjects();
    projects.forEach((project) => {
      selectProjectToShow.appendChild(createElement('option', project.name, project.id));
      selectProjectAddForm.appendChild(createElement('option', project.name, project.id));
    });
  };

  const emptyForm = () => {
    newTodoTitle.value = '';
    newTodoDescription.value = '';
    newTodoDueDate.value = '';
    newTodoPriority.selectedIndex = 0;
  };
  const createNewTodo = (projectID, title, description, dueDate, priority) => {
    todoManager.createNewTodo(projectID, title, description, dueDate, priority);
    loadTodosList(getSelecterProjectToShow());
  };

  const render = () => {
    loadProjectsList();
    loadTodosList(getSelecterProjectToShow());
  };
  let loadTodosList = (projectID) => {
    todoList.innerHTML = '';
    const project = todoManager.getProject(projectID);
    project.todos.forEach((todo) => {
      const todoDiv = createElement('div', null, null, 'todo');
      if (todo.priority === 'high') {
        todoDiv.classList.add('high-priority');
      }
      todoDiv.appendChild(createElement('div', todo.title, null, 'title'));
      todoDiv.appendChild(createElement('div', todo.description, null, 'description'));
      todoDiv.appendChild(createElement('div', todo.dueDate, null, 'date'));
      const button = createElement('button', 'delete', null, null);
      button.addEventListener('click', () => {
        todoManager.deleteTodo(projectID, todo.id);
        loadTodosList(projectID);
        render();
      });

      const buttonEdit = createElement('button', 'edit', null, null);
      buttonEdit.addEventListener('click', () => {
        newTodoTitle.value = todo.title;
        newTodoDescription.value = todo.description;
        newTodoDueDate.value = todo.dueDate;
        newTodoPriority.value = todo.priority;
        todoIdHolder.value = todo.id;
        todoIdHolder.dataset.projectID = projectID;
        editBackButton.classList.remove('hidden');
        todoHeader.innerText = 'EDIT THIS TODO';
        addNewTodoBotton.innerText = 'Edit';
      });
      todoDiv.appendChild(button);
      todoDiv.appendChild(buttonEdit);
      todoList.appendChild(todoDiv);
    });
  };


  const createNewProject = () => {
    if (!(/([^\s])/.test(newProjectName.value))) {
      alert('No empty project names!');
      return;
    }

    todoManager.createNewProject(newProjectName.value);
    newProjectName.value = '';
    render();
  };

  const initalize = () => {
    selectProjectToShow.addEventListener('change', () => {
      const projectId = getSelecterProjectToShow();
      loadTodosList(projectId);
    });

    deleteProjectButton.addEventListener('click', (event) => {
      event.preventDefault();
      const projectId = getSelecterProjectToShow();
      todoManager.deleteProject(projectId);
      render();
    });

    editBackButton.addEventListener('click', (event) => {
      event.preventDefault();
      editBackButton.classList.add('hidden');
      emptyForm();
      todoHeader.innerText = 'CREATE NEW TODO';
      addNewTodoBotton.innerText = 'Create';
    });
    addNewProjectBotton.addEventListener('click', (event) => {
      event.preventDefault();
      createNewProject();
    });
    addNewTodoBotton.addEventListener('click', (event) => {
      event.preventDefault();
      let projectID = getSelecterProjectToAdd();
      const todoID = todoIdHolder.value;

      if (newTodoTitle.value === '') {
        alert('Title cannot be empty!!');
        return;
      }
      if (!(/([^\s])/.test(newTodoTitle.value))) {
        alert('You are cheating now, no empty titles!');
        return;
      }
      if (addNewTodoBotton.innerText === 'Create') {
        createNewTodo(projectID, newTodoTitle.value, newTodoDescription.value,
          newTodoDueDate.value,
          newTodoPriority.options[newTodoPriority.selectedIndex].value);
        emptyForm();
      } else {
        projectID = todoIdHolder.dataset.projectID;
        todoManager.updateTodo(projectID, todoID, newTodoTitle.value,
          newTodoDescription.value, newTodoDueDate.value,
          newTodoPriority.options[newTodoPriority.selectedIndex].value);

        emptyForm();
        editBackButton.classList.add('hidden');
        todoHeader.innerText = 'CREATE NEW TODO';
        addNewTodoBotton.innerText = 'Create';
        render();
      }
    });
  };

  return {
    render,
    createNewProject,
    initalize,
  };
};

export default DomManager;
