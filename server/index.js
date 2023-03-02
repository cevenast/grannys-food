const express = require('express')
const app = express()
const mongoose = require('mongoose')
//passport
//session
//mongostore
const methodOverride = require("method-override") // Allows POST requests to be override for other methods like PUT or DELETE
//flash
const morgan = require('morgan')
const connectDB = require('./config/mongo')
const cors = require('cors')
const recipesRoutes = require('./routes/recipes')

// Use .env file in config folder
require('dotenv').config({ path: "./config/.env "})
// Connect to MongoDB
connectDB()

// Middleware

app.use(express.json()) // Body Parsing: recognize the incoming Request Object as a JSON Object.
app.use(express.urlencoded({extended:false})) // Body Parsing: recognize the incoming Request Object as strings or arrays.(for Forms)
app.use(cors())
app.use(express.static('build')) // Static Folder
app.use(morgan('tiny')) // Logging
app.use(methodOverride("_method")); //Use forms for put / delete


// Setup Routes for the server to listen

app.use('/api', recipesRoutes)

// Gets all notes from the fetch made by React with axios and useEffect  



// app.get('/api/notes/', (req, res) => {
//      Note.find({})
//         .then(notes => {
//             res.json(notes)
//         })
// }) 

// // Get a specific note by id
// app.get('/api/notes/:id', (request, response, next) => {  
//     Note.findById(request.params.id)
//     .then(note => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch(error => next(error))
// })


// // Add a new note to the database
// app.post('/api/notes', (req, res, next) => {
//     const note = new Note({
//         content:req.body.content,
//         important:req.body.important || false,
//     })
//     note.save()
//         .then(note => {
//             res.json(note)
//             console.log(`Added new note:\n${note}`)
//         })
//         .catch(error => next(error))
// })


// app.delete('/api/notes/:id', (req, res, next) => {
//     const id = req.params.id
//     Note.findByIdAndDelete(id)
//        .then(result => {
//         res.status(204).end()
//         console.log(`${id} was removed`)
//     })
//        .catch(err => next(err))
// })


// app.put('/api/notes/:id', (req,res,next) => {
//     const id = req.params.id
//     const note = {
//         content: req.body.content,
//         important: req.body.important
//     }

//     Note.findByIdAndUpdate(id,note,{ new: true, runValidators: true, context:'query' })
//        .then(updatedNote => {
//         res.json(updatedNote)
//         console.log(`note ${id} importance was set to ${note.important}`)
//        })
//        .catch(error => next(error))
// })

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
        return response.status(400).json({error: error.message})
    }
    else if (error.name === 'SyntaxError'){
        console.log('wrong json')
        return response.status(400).json({error: 'escribe bien aweonao'})
    }
    next(error)
}
app.use(errorHandler)


app.listen(process.env.PORT, (req,res) => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
})