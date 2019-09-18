import TodoManager from './todoManager'
import DomManager from './domManager'

let todoManager=TodoManager()
todoManager.createNewProject("Other ")
let domManager=DomManager(todoManager)
domManager.initalize()
domManager.render()
