/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/domManager.js":
/*!***************************!*\
  !*** ./src/domManager.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n\nconst DomManager = (todoManager) => {\n  const selectProjectToShow = document.getElementById('projects-list');\n  const selectProjectAddForm = document.getElementById('select-project-add-form');\n  const todoList = document.getElementById('todo-list');\n  const newProjectName = document.getElementById('new-project-name');\n  const addNewProjectBotton = document.getElementById('new-project-submit');\n  const addNewTodoBotton = document.getElementById('new-todo-submit');\n  const todoHeader = document.getElementById('todoHeader');\n  const editBackButton = document.getElementById('editBackButton');\n  const deleteProjectButton = document.getElementById('deleteProject');\n\n  const newTodoTitle = document.getElementById('new-todo-title');\n  const newTodoDescription = document.getElementById('new-todo-description');\n  const newTodoDueDate = document.getElementById('new-todo-dueDate');\n  const newTodoPriority = document.getElementById('new-todo-priority');\n  const todoIdHolder = document.getElementById('todoIdHolder');\n\n\n  const getSelecterProjectToShow = () => selectProjectToShow.options[\n    selectProjectToShow.selectedIndex].value;\n  const getSelecterProjectToAdd = () => selectProjectAddForm.options[\n    selectProjectAddForm.selectedIndex].value;\n  const loadProjectsList = () => {\n    selectProjectToShow.innerHTML = '';\n    selectProjectAddForm.innerHTML = '';\n\n    const projects = todoManager.getProjects();\n    projects.forEach((project) => {\n      selectProjectToShow.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('option', project.name, project.id));\n      selectProjectAddForm.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('option', project.name, project.id));\n    });\n  };\n\n  const emptyForm = () => {\n    newTodoTitle.value = '';\n    newTodoDescription.value = '';\n    newTodoDueDate.value = '';\n    newTodoPriority.selectedIndex = 0;\n  };\n  const createNewTodo = (projectID, title, description, dueDate, priority) => {\n    todoManager.createNewTodo(projectID, title, description, dueDate, priority);\n    loadTodosList(getSelecterProjectToShow());\n  };\n\n  const render = () => {\n    loadProjectsList();\n    loadTodosList(getSelecterProjectToShow());\n  };\n  let loadTodosList = (projectID) => {\n    todoList.innerHTML = '';\n    const project = todoManager.getProject(projectID);\n    project.todos.forEach((todo) => {\n      const todoDiv = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', null, null, 'todo');\n      if (todo.priority === 'high') {\n        todoDiv.classList.add('high-priority');\n      }\n      todoDiv.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', todo.title, null, 'title'));\n      todoDiv.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', todo.description, null, 'description'));\n      todoDiv.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('div', todo.dueDate, null, 'date'));\n      const button = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', 'delete', null, null);\n      button.addEventListener('click', () => {\n        todoManager.deleteTodo(projectID, todo.id);\n        loadTodosList(projectID);\n        render();\n      });\n\n      const buttonEdit = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])('button', 'edit', null, null);\n      buttonEdit.addEventListener('click', () => {\n        newTodoTitle.value = todo.title;\n        newTodoDescription.value = todo.description;\n        newTodoDueDate.value = todo.dueDate;\n        newTodoPriority.value = todo.priority;\n        todoIdHolder.value = todo.id;\n        todoIdHolder.dataset.projectID = projectID;\n        editBackButton.classList.remove('hidden');\n        todoHeader.innerText = 'EDIT THIS TODO';\n        addNewTodoBotton.innerText = 'Edit';\n      });\n      todoDiv.appendChild(button);\n      todoDiv.appendChild(buttonEdit);\n      todoList.appendChild(todoDiv);\n    });\n  };\n\n\n  const createNewProject = () => {\n    if (!(/([^\\s])/.test(newProjectName.value))) {\n      alert('No empty project names!');\n      return;\n    }\n\n    todoManager.createNewProject(newProjectName.value);\n    newProjectName.value = '';\n    render();\n  };\n\n  const initalize = () => {\n    selectProjectToShow.addEventListener('change', () => {\n      const projectId = getSelecterProjectToShow();\n      loadTodosList(projectId);\n    });\n\n    deleteProjectButton.addEventListener('click', (event) => {\n      event.preventDefault();\n      const projectId = getSelecterProjectToShow();\n      todoManager.deleteProject(projectId);\n      render();\n    });\n\n    editBackButton.addEventListener('click', (event) => {\n      event.preventDefault();\n      editBackButton.classList.add('hidden');\n      emptyForm();\n      todoHeader.innerText = 'CREATE NEW TODO';\n      addNewTodoBotton.innerText = 'Create';\n    });\n    addNewProjectBotton.addEventListener('click', (event) => {\n      event.preventDefault();\n      createNewProject();\n    });\n    addNewTodoBotton.addEventListener('click', (event) => {\n      event.preventDefault();\n      let projectID = getSelecterProjectToAdd();\n      const todoID = todoIdHolder.value;\n\n      if (newTodoTitle.value === '') {\n        alert('Title cannot be empty!!');\n        return;\n      }\n      if (!(/([^\\s])/.test(newTodoTitle.value))) {\n        alert('You are cheating now, no empty titles!');\n        return;\n      }\n      if (addNewTodoBotton.innerText === 'Create') {\n        createNewTodo(projectID, newTodoTitle.value, newTodoDescription.value,\n          newTodoDueDate.value,\n          newTodoPriority.options[newTodoPriority.selectedIndex].value);\n        emptyForm();\n      } else {\n        projectID = todoIdHolder.dataset.projectID;\n        todoManager.updateTodo(projectID, todoID, newTodoTitle.value,\n          newTodoDescription.value, newTodoDueDate.value,\n          newTodoPriority.options[newTodoPriority.selectedIndex].value);\n\n        emptyForm();\n        editBackButton.classList.add('hidden');\n        todoHeader.innerText = 'CREATE NEW TODO';\n        addNewTodoBotton.innerText = 'Create';\n        render();\n      }\n    });\n  };\n\n  return {\n    render,\n    createNewProject,\n    initalize,\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DomManager);\n\n\n//# sourceURL=webpack:///./src/domManager.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst createElement = (type, text = null, value = null, _class = null) => {\n  const node = document.createElement(type);\n  if (text !== null) {\n    const textNode = document.createTextNode(text);\n    node.appendChild(textNode);\n  }\n  if (value !== null) {\n    node.setAttribute('value', value);\n  }\n  if (_class !== null) {\n    node.classList.add(_class);\n  }\n  return node;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createElement);\n\n\n//# sourceURL=webpack:///./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todoManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoManager */ \"./src/todoManager.js\");\n/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManager */ \"./src/domManager.js\");\n\n\n\nconst todoManager = Object(_todoManager__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\nif (localStorage.getItem('projects') !== null) {\n  todoManager.setProjects(JSON.parse(localStorage.getItem('projects')));\n} else {\n  localStorage.setItem('projects', JSON.stringify(todoManager.getProjects()));\n}\nconst domManager = Object(_domManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(todoManager);\ndomManager.initalize();\ndomManager.render();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/todoManager.js":
/*!****************************!*\
  !*** ./src/todoManager.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Todo = (id, title, description, dueDate, priority) => ({\n  id,\n  title,\n  description,\n  dueDate,\n  priority,\n});\nconst Project = (id, name) => ({\n  id,\n  name,\n  todos: [],\n});\n\nconst ProjectList = () => {\n  const project = Project(1, 'default');\n  project.todos.push(Todo(1, 'title', 'description', '2019-09-20', 'high'));\n  const projects = [];\n  projects.push(project);\n  return (projects);\n};\n\n\nconst TodoManager = () => {\n  let projectList = ProjectList();\n\n  const setProjects = (projets) => {\n    projectList = projets;\n  };\n\n  const getProjects = () => projectList;\n\n  const saveToStorage = () => {\n    localStorage.setItem('projects', JSON.stringify(getProjects()));\n  };\n\n  const getProject = (projectID) => {\n    const id = Number(projectID);\n    let target = null;\n    projectList.some(\n      (project) => {\n        if (project.id === id) {\n          target = project;\n          return true;\n        }\n        return false;\n      },\n    );\n    return target;\n  };\n\n  const getTodo = (projectID, todoID) => {\n    const project = getProject(projectID);\n    const id = Number(todoID);\n    let target = null;\n    project.todos.some(\n      (todo) => {\n        if (todo.id === id) {\n          target = todo;\n          return true;\n        }\n        return false;\n      },\n    );\n    return target;\n  };\n\n  const createNewProject = (name) => {\n    const id = projectList[projectList.length - 1].id + 1;\n    projectList.push(Project(id, name));\n    saveToStorage();\n  };\n\n  const deleteProject = (projectID) => {\n    const id = Number(projectID);\n    if (id === 1) {\n      alert('Default project can\\'t be deleted');\n      return;\n    }\n    projectList = projectList.filter((item) => {\n      if (item.id === id) {\n        return false;\n      }\n      return true;\n    });\n    saveToStorage();\n  };\n\n  const updateProject = (id, name) => {\n    const project = getProject(id);\n    project.name = name;\n    saveToStorage();\n  };\n\n  const createNewTodo = (projectID, title, description, dueDate, priority) => {\n    const project = getProject(projectID);\n    let id = 1;\n    if (project.todos.length !== 0) {\n      id = project.todos[project.todos.length - 1].id + 1;\n    }\n    const todo = Todo(id, title, description, dueDate, priority);\n    project.todos.push(todo);\n    saveToStorage();\n  };\n\n  const deleteTodo = (projectID, todoID) => {\n    const project = getProject(projectID);\n    project.todos = project.todos.filter((item) => {\n      if (item.id === todoID) {\n        return false;\n      }\n      return true;\n    });\n    saveToStorage();\n  };\n\n\n  const updateTodo = (projectID, id, title, description, dueDate, priority) => {\n    const todo = getTodo(projectID, id);\n    todo.title = title;\n    todo.description = description;\n    todo.dueDate = dueDate;\n    todo.priority = priority;\n    saveToStorage();\n  };\n\n  return {\n    getProject,\n    getProjects,\n    createNewProject,\n    deleteProject,\n    updateProject,\n    createNewTodo,\n    deleteTodo,\n    updateTodo,\n    setProjects,\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoManager);\n\n\n//# sourceURL=webpack:///./src/todoManager.js?");

/***/ })

/******/ });