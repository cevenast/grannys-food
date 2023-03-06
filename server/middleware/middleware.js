//const logger = require('../utils/logger')
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



// 404 Unkown Endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { unknownEndpoint, tokenExtractor, userExtractor }
