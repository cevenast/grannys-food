const express = require('express')
const app = express()
const methodOverride = require('method-override') // Allows POST requests to be override for other methods like PUT or DELETE
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/mongo')
const recipesRoutes = require('./routes/recipes')
const usersRoutes = require('./routes/users')
const loginRoutes = require('./routes/login')
const logger = require('./utils/logger')
const middleware = require('./middleware/middleware')
const errorHandler = require('./middleware/errorHandler')
require('./middleware/multer')

require('dotenv').config({ path: './config/*' }) // Use .env file in config folder

logger.info('Connecting to MongoDB...')
connectDB() // Connect to MongoDB

// Middleware

app.use(express.json()) // Body Parsing: recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({ extended:false })) // Body Parsing: recognize the incoming Request Object as strings or arrays.(for Forms)
app.use(cors())
app.use(express.static('build')) // Static Folder
app.use(morgan('tiny')) // Logging
app.use(methodOverride('_method')) //Use forms for put / delete


// Setup Routes for the server to listen

app.use('/api/recipes', recipesRoutes)
app.use('/api/users', usersRoutes)
app.use('/login', loginRoutes)
const path = require('path')
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'build','index.html') ))

// Middleware setup for errors

app.use(errorHandler)
app.use(middleware.unknownEndpoint) // 404 Unknown Endpoint: Returns error message in JSON format


module.exports = app