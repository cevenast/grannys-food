const bcrypt = require('bcrypt')
const User = require('../models/user')
const Recipe = require('../models/recipe')

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
  },

  ////////////////////////
  // Get specific user //
  //////////////////////

  getUser: async(req, res) => {
    const username = req.params.username
    console.log(username)
    try{
      const user = await User.findOne({ username:username }).lean().
        // populate('uploadedRecipes')
        populate({
          path:'uploadedRecipes',
          select: '_id title imgSrc description tags totalFavorites isUserFavorite favoriteOf user',
          populate:{ path:'user', select:'username' }
        })

      user.uploadedRecipes.forEach(recipe => {

        // Total number of users that have the recipe as favorite
        recipe.totalFavorites = recipe.favoriteOf.length

        // Checks for each recipe if the current user has it as favorite or not, and adds boolean to each recipe for the repsonse
        if (req.userId){ // equals is used to compare with mongo ObjectId
          recipe.isUserFavorite = recipe.favoriteOf.some(user => user.equals(req.userId))
        }
        delete recipe.favoriteOf
      })

      delete user.passwordHash
      delete user.favoriteRecipes
      delete user.email
      delete user.creationDate
      delete user.__v
      delete user._id
      res.json(user)
    }
    catch(err){
      console.log(err)
      res.send(err)
    }
  },

  setFavourite: async(req, res) => {
    try{
      const { postId } = req.body
      //
      // Middleware tokenExtractor checks for token in the headers and sets it to req.token
      // Middleware userExtractor verifies the token and sets the corresponding user to req.userId
      //

      const user = await User.findById(req.userId)
      const recipe = await Recipe.findById(postId)
      console.log(recipe)

      // Checks if the user has the receipe in their favorites
      if (user.favoriteRecipes.includes(postId)){ // If the recipe is not in favorites, filters the array.
        user.favoriteRecipes = user.favoriteRecipes.filter(id => id != postId)
        recipe.favoriteOf = recipe.favoriteOf.filter(id => id != req.userId)
      }
      else{ // If it's already in favorites, filters the array.
        user.favoriteRecipes.push(postId)
        recipe.favoriteOf.push(req.userId)
      }

      console.log(user.favoriteRecipes)
      console.log(recipe.favoriteOf)
      await user.save()
      console.log('Updated user\'s favorite recipes')
      await recipe.save()
      console.log('Updates recipe\'s favouriteOf list')
      res.json(recipe.favoriteOf.length)
    }
    catch(err){
      console.log(err)
    }
  }
}