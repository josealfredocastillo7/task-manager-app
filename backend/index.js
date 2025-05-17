// Load environment variables from .env file
require('dotenv').config()

// Import required modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Initialize the Express application
const app = express()

// Configurar CORS para permitir solicitudes desde http://localhost:8080
app.use(cors())

// Get the port and database connection string from environment variables
const port = process.env.PORT || 3000
const db = process.env.DB

// Middleware to parse JSON bodies
app.use(express.json())

// Import the router
const router = require('./config/router')

// Use the router for handling routes with the prefix /api/v1
app.use('/api/v1', router)

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err))

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})