// Import the express module and create a router
const express = require('express')
const router = express.Router()

// Import all controllers
const { 
  HomeController, 
} = require('../api/controllers')


// HOME ROUTES
router.get('/', HomeController.getHome)

// Export the router to be used in other parts of the application
module.exports = router