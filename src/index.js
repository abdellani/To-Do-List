import TodoManager from './todoManager';
import DomManager from './domManager';

const todoManager = TodoManager();
if (localStorage.getItem('projects') !== null) {
  todoManager.setProjects(JSON.parse(localStorage.getItem('projects')));
} else {
  localStorage.setItem('projects', JSON.stringify(todoManager.getProjects()));
}
const domManager = DomManager(todoManager);
domManager.initalize();
domManager.render();
