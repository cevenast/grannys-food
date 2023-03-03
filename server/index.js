const express = require('express')
const app = express()
//const mongoose = require('mongoose')
//passport
//session
//mongostore
const methodOverride = require('method-override') // Allows POST requests to be override for other methods like PUT or DELETE
//flash
const morgan = require('morgan')
const connectDB = require('./config/mongo')
const cors = require('cors')
const recipesRoutes = require('./routes/recipes')

// Use .env file in config folder
require('dotenv').config({ path: './config/.env ' })
// Connect to MongoDB
connectDB()

// Middleware

app.use(express.json()) // Body Parsing: recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({ extended:false })) // Body Parsing: recognize the incoming Request Object as strings or arrays.(for Forms)
app.use(cors())
app.use(express.static('build')) // Static Folder
app.use(morgan('tiny')) // Logging
app.use(methodOverride('_method')) //Use forms for put / delete


// Setup Routes for the server to listen

app.use('/api', recipesRoutes)


// 404 Unknown Endpoint

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint) // Returns error message in JSON format



// Error Handler

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError'){
    console.log(error.message)
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'SyntaxError'){
    console.log('wrong json')
    return response.status(400).json({ error: 'wrong json' })
  }
  next(error)
}
app.use(errorHandler)


app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`)
})