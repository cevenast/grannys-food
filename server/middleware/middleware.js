const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

// Isolates the token from the authorization Header

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
    next()
  }
  else{
    next()
  }
}

// Verifies the token and sets the corresponding user to req.user
const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (decodedToken.id) {
    req.userId = decodedToken.id
    req.username = decodedToken.username
    next()
  }
  else{
    return res.status(401).json({ error: 'token invalid' })
  }
}


// Error Handler
const errorHandler = (error, request, response, next) => {
  logger.error(`${error.name}: ${error.message}`)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  else if (error.name === 'ValidationError'){

    // User Creation Validation
    const responseMessage = {}
    for (let err of Object.keys(error.errors)) {  // Groups the validation messages
      responseMessage[err] = error.errors[err].message
    }
    return response.status(400).json(responseMessage)
  }

  else if (error.name === 'SyntaxError'){
    return response.status(400).json({ error: error.message })
  }

  else if (error.name === 'JsonWebTokenError'){
    return response.status(400).json({ error: 'Invalid Token' })
  }

  else if (error.name === 'TypeError'){
    if (!request.body.username || !request.body.password || !request.body.email){
      console.log('Invalid JSON Format')
      return response.status(400).json({ error: 'Invalid JSON Format' })
    }
    else{
      return response.status(400).json({ error: error.message })
    }
  }

  next(error)
}

// 404 Unkown Endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { errorHandler, unknownEndpoint, tokenExtractor, userExtractor }
