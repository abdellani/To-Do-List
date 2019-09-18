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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n\nconst DomManager = (todoManager) => {\n  let selectProjectToShow = document.getElementById(\"projects-list\")\n  let selectProjectAddForm = document.getElementById(\"select-project-add-form\")\n  let todoList = document.getElementById(\"todo-list\")\n  let newProjectName = document.getElementById(\"new-project-name\")\n  let addNewProjectBotton = document.getElementById(\"new-project-submit\")\n  let addNewTodoBotton = document.getElementById(\"new-todo-submit\")\n\n  let newTodoTitle = document.getElementById(\"new-todo-title\")\n  let newTodoDescription = document.getElementById(\"new-todo-description\")\n  let newTodoDueDate = document.getElementById(\"new-todo-dueDate\")\n  let newTodoPriority = document.getElementById(\"new-todo-priority\")\n  let newTodoNotes = document.getElementById(\"new-todo-notes\")\n\n\n  const initalize = () => {\n    selectProjectToShow.addEventListener(\"change\", () => {\n      let projectId = getSelecterProjectToShow()\n      loadTodosList(projectId)\n    })\n    addNewProjectBotton.addEventListener(\"click\", (event) => {\n      event.preventDefault();\n      createNewProject()\n    })\n    addNewTodoBotton.addEventListener(\"click\", (event) => {\n      event.preventDefault();\n      let projectID = getSelecterProjectToAdd()\n      createNewTodo(projectID, newTodoTitle.value, newTodoDescription.value, newTodoDueDate.value, newTodoPriority.value, newTodoNotes.value, false/*status*/)\n    })\n  }\n  const render = () => {\n    loadProjectsList()\n    loadTodosList(getSelecterProjectToShow())\n  }\n  let getSelecterProjectToShow = () => {\n    return selectProjectToShow.options[selectProjectToShow.selectedIndex].value\n  }\n  let getSelecterProjectToAdd = () => {\n    return selectProjectAddForm.options[selectProjectAddForm.selectedIndex].value\n  }\n\n  let loadProjectsList = () => {\n    selectProjectToShow.innerHTML = \"\";\n    selectProjectAddForm.innerHTML = \"\";\n\n    let projects = todoManager.getProjects()\n    projects.forEach((project) => {\n      selectProjectToShow.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"option\", project.name, project.id))\n      selectProjectAddForm.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"option\", project.name, project.id))\n    })\n  }\n  let loadTodosList = (projectID) => {\n    todoList.innerHTML = \"\"\n    let project = todoManager.getProject(projectID)\n    project.todos.forEach((todo) => {\n      let todoDiv = Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"div\", null, null, \"todo\")\n      todoDiv.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"div\", todo.title, null, \"title\"))\n      todoDiv.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"div\", todo.description, null, \"description\"))\n      todoDiv.appendChild(Object(_helpers__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"div\", todo.dueDate, null, \"date\"))\n      todoList.appendChild(todoDiv)\n    })\n  }\n  let createNewProject = () => {\n    todoManager.createNewProject(newProjectName.value)\n    newProjectName.value = \"\"\n    render()\n  }\n  const createNewTodo = (projectID, title, description, dueDate, priority, notes, status) => {\n    todoManager.createNewTodo(projectID, title, description, dueDate, priority, notes, status)\n    loadTodosList(getSelecterProjectToShow())\n  }\n\n  return {\n    render,\n    createNewProject,\n    initalize\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DomManager);\n\n//# sourceURL=webpack:///./src/domManager.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst createElement = (type, text = null,value=null ,_class = null) => {\n  const node = document.createElement(type);\n  if (text !== null) {\n    const textNode = document.createTextNode(text);\n    node.appendChild(textNode);\n  }\n  if (value !== null) {\n    node.setAttribute(\"value\",value)\n  }\n  if (_class !== null) {\n    node.classList.add(_class)\n  }\n  return node;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createElement);\n\n\n//# sourceURL=webpack:///./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todoManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoManager */ \"./src/todoManager.js\");\n/* harmony import */ var _domManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManager */ \"./src/domManager.js\");\n\n\n\nlet todoManager=Object(_todoManager__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\ntodoManager.createNewProject(\"Other \")\nlet domManager=Object(_domManager__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(todoManager)\ndomManager.initalize()\ndomManager.render()\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/todoManager.js":
/*!****************************!*\
  !*** ./src/todoManager.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nlet Todo = (id, title, description, dueDate, priority, notes, status) => {\n  return {\n    id,\n    title,\n    description,\n    dueDate,\n    priority,\n    notes,\n    status\n  }\n}\nlet Project = (id, name) => {\n  return {\n    id,\n    name,\n    todos: []\n  }\n}\n\nlet ProjectList = () => {\n  let project = Project(1, \"default\");\n  project.todos.push(Todo(1, \"title\", \"description\", \"dueDate\", \"priority\", \"notes\", \"status\"));\n  let projects = []\n  projects.push(project)\n  return (projects)\n}\n\n\nconst TodoManager = () => {\n\n  let projectList = ProjectList();\n\n  let getProject = (id) => {\n    id=Number(id)\n    let target = null;\n    projectList.some(\n      (project) => {\n        if (project.id === id) {\n          target = project;\n          return true;\n        }\n      }\n    )\n    return target;\n  }\n  let getProjects = () => {\n    return projectList;\n  }\n\n  let getTodo = (projectID, id) => {\n    let project = getProject(projectID);\n    let target = null;\n    project.todos.some(\n      (todo) => {\n        if (todo.id === id) {\n          target = todo;\n          return true;\n        }\n      }\n    )\n    return target;\n  }\n\n  let createNewProject = (name) => {\n    let id = projectList[projectList.length - 1].id + 1;\n    projectList.push(Project(id, name))\n  }\n\n  const deleteProject = (id) => {\n    projectList = projectList.filter((item) => {\n      if (item.id === id) {\n        return false\n      } else {\n        return true\n      }\n    })\n  }\n\n  const updateProject = (id, name) => {\n    let project = getProject(id);\n    project.name = name;\n  }\n\n  const createNewTodo = (projectID, title, description, dueDate, priority, notes, status) => {\n    let project = getProject(projectID);\n    let id = 1;\n    if (project.todos.length !== 0) {\n      id = project.todos[project.todos.length - 1].id + 1\n    }\n    let todo = Todo(id, title, description, dueDate, priority, notes, status)\n    project.todos.push(todo)\n  }\n\n  const deleteTodo = (projectID, todoID) => {\n    let project = getProject(projectID);\n    project.todos = project.todos.filter((item) => {\n      if (item.id === todoID) {\n        return false\n      } else {\n        return true\n      }\n    })\n  }\n\n\n  const updateTodo = (projectID, id, field, value) => {\n    let todo = getTodo(projectID, id)\n    todo[field] = value\n  }\n\n  return {\n    getProject,\n    getProjects,\n    createNewProject,\n    deleteProject,\n    updateProject,\n    createNewTodo,\n    deleteTodo,\n    updateTodo\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TodoManager);\n\n//# sourceURL=webpack:///./src/todoManager.js?");

/***/ })

/******/ });