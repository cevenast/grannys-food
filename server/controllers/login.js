const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
  /////////////////////////////////
  //   Handles user logging in   //
  // Creates a token if accepted //
  /////////////////////////////////

  userLogIn: async (req,res, next) => {
    try{
      // Get username and password sent by the user
      const { username, password } = req.body
      const user = await User.findOne({ username: username }) // Search user from the DB

      // checks if the user exists, and if it does, hashes the password to check if it matches the hashed password in the DB
      const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
      if (!(user && passwordCorrect)){
        console.log('invalid username or password')
        return res.status(401).json('invalid username or password') // 401 unauthorized
      }

      // Prepares the info for the token
      const userForToken = {
        username: user.username,
        id: user._id
      }

      // Generates the token with the info given. Set expiration in 2 hours.
      const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn:'2h' }) // token is digitally signed
      console.log(`${userForToken.username} has logged in with the following token: ${token}`)
      res.status(200).send({ token, username: user.username, userId:user._id }) // token is sent to the client so that they can have in the headers
    }

    catch(err){
      next(err)
    }
  },

  validateToken: async (req, res) => {
    // middleware tokenExtractor takes the token from the headers
    // middleware userExctractor checks if token is valid or expired. If not,
    res.json('ok')
  }


}