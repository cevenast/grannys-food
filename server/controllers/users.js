const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = {

  /////////////////////////
  //   Creates new User  //
  /////////////////////////

  createUser: async (req, res, next) => {
    try{
      const { username, password, email } = req.body
      if (!username || !password || !email){
        console.log('Invalid JSON Format')
        return res.status(400).json({ error: 'Invalid JSON Format' })
      }

      if (password.length < 8){
        console.log('Failed User Creation: Password should contain 8 characters minimum')
        return res.status(400).json({ error:'Password should contain 8 characters minimum' })
      }

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds) // bcrypt hashes the password

      const user = new User({
        username,
        passwordHash,
        email,
        favoriteRecipes: [],
        creationDate: new Date()
      })

      const savedUser = await user.save()
      res.status(201).json(savedUser)
    }
    catch(err) {
      next(err)
    }
  },

  /////////////////////////
  // Get all users in DB //
  /////////////////////////

  getAllUsers: async(req, res, next) => {
    try{
      const users = await User.find({})
      res.json(users)
    }
    catch(err){
      next(err)
    }
  }
}