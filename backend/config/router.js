// Import the express module and create a router
const express = require('express')
const router = express.Router()

// Import all controllers
const { 
  HomeController, 
} = require('../api/controllers')
const TaskController = require('../api/controllers/TaskController')

// HOME ROUTES
router.get('/', HomeController.getHome)

// TASK ROUTES
router.get('/tasks', TaskController.getTasks)
router.post('/tasks', TaskController.createTask)
router.patch('/tasks/:id', TaskController.updateTask)
router.delete('/tasks/:id', TaskController.deleteTask)

// Export the router to be used in other parts of the application
module.exports = router