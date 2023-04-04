const logger = require('../utils/logger')

///////////////////
// Error Handler //
///////////////////

const errorHandler = (error, request, response, next) => {
  logger.error(`${error.name}: ${error.message}`)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: error.message })
  }

  else if (error.name === 'ValidationError'){
    /////////////////////////////
    // User Creation Validation//
    /////////////////////////////
    const responseMessage = {}
    for (let err of Object.keys(error.errors)) {  // Groups the validation messages
      responseMessage[err] = error.errors[err].message
    }
    return response.status(400).json(responseMessage)
    //////////////////////////////
  }

  else if (error.name === 'SyntaxError'){
    return response.status(400).json({ error: error.message })
  }

  else if (error.name === 'JsonWebTokenError'){
    return response.status(400).json({ error: 'Invalid Token' })
  }

  else if (error.name === 'TokenExpiredError'){
    return response.status(401).json({ error: 'The session has expired' })
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

module.exports = errorHandler