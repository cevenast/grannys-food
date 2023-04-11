//const cloudinary = require('../middleware/cloudinary')
//const User = require('../models/User.js')
const Recipe = require('../models/recipe')
const User = require('../models/user')
const cloudinary = require('../middleware/cloudinary')


module.exports = {

  //////////////////////
  // Get all recipes  //
  //////////////////////

  getAll: async(req,res,next) => {

    const tags = req.query.tag
    let sort = req.query.sort.split(':')
    const sortOption = {}
    sortOption[sort[0]] = sort[1]

    try{
      const recipes = await Recipe
        .find(tags ? { tags:{ $all:tags } } : {})
        .sort(sortOption)
        .lean()
        .populate('user', { username: 1, _id: 1 })

      // For each recipe, adds number of users that favorited it, and if the current user has it as favorite
      recipes.forEach(recipe => {
        // Total number of users that have the recipe as favorite
        recipe.totalFavorites = recipe.favoriteOf.length
        // Checks for each recipe if the current user has it as favorite or not, and adds boolean to each recipe for the repsonse
        if (req.userId){ // equals is used to compare with mongo ObjectId
          recipe.isUserFavorite = recipe.favoriteOf.some(user => user.equals(req.userId))
        }
        // And delete properties that shouldn't be sent to the client
        delete recipe.cloudinaryId
        delete recipe.__v
        delete recipe.favoriteOf
      })

      res.json(recipes)
    }
    catch(err){
      next(err)
    }
  },

  //////////////////////
  //  Get one recipe  //
  //////////////////////

  getRecipe: async (req, res, next) => {
    try{
      const id = req.params.id
      const recipe = await Recipe.findById(id).lean().populate('user', { username: 1, _id: 1 })
      delete recipe.cloudinaryId
      delete recipe.favoriteOf
      delete recipe.__v
      res.json(recipe)
    }
    catch(err){
      next(err)
    }
  },
  //////////////////////
  // Post a new recipe//
  //////////////////////

  newRecipe: async (req, res, next) => {
    try{
      // Client sends filled formulary for the recipe
      const body = req.body
      console.log(body)
      // Middleware tokenExtractor checks for token in the headers and sets it to req.token
      // Middleware userExtractor verifies the token and sets the corresponding user to req.user
      const user = await User.findById(req.userId)

      //req.file.path contains the uploaded image
      const cloudinaryRes = await cloudinary.uploader.upload(req.file.path)

      console.log(cloudinaryRes)

      const newRecipe = new Recipe ({
        title: body.title[0] + body.title.slice(1), // Ensures uppercase first
        description: body.description,
        longDescription:body.longDescription,
        ingredients: body.ingredients.split('\n'),
        directions: body.directions.split('\n'),
        tags: JSON.parse(body.tags),
        imgSrc: cloudinaryRes.secure_url,
        cloudinaryId: cloudinaryRes.public_id,
        user: user._id,
        favoriteOf:[],
        favoriteCount:0,
        createdAt: new Date()
      })

      const savedRecipe = await newRecipe.save()

      console.log(`${req.username}'s recipe: ${body.title} was saved`)
      user.uploadedRecipes = user.uploadedRecipes.concat(savedRecipe._id)

      await user.save()
      console.log(`Updated ${user.username} uploaded recipees list`)

      res.json(savedRecipe)
    }
    catch(err){
      console.log(err)
      next(err)
    }
  },

  getUserFavorites: async (req, res, next ) => {
    if (!req.userId){
      res.json('must be logged in')
    }

    try{
      const user = await User.findById(req.userId).lean()
        .populate({
          path:'favoriteRecipes',
          populate:{ path:'user', select:'username' } })

      const favorites = user.favoriteRecipes
      favorites.forEach(recipe => {

        // Total number of users that have the recipe as favorite
        recipe.totalFavorites = recipe.favoriteOf.length
        // Checks for each recipe if the current user has it as favorite or not, and adds boolean to each recipe for the repsonse
        // equals is used to compare with mongo ObjectId
        recipe.isUserFavorite = recipe.favoriteOf.some(user => user.equals(req.userId))

        // Deletes properties that won't be sent to the server
        delete recipe.favoriteOf
        delete recipe.cloudinaryId
        delete recipe.__v

      })
      console.log(favorites)
      res.json(favorites.reverse())
    }

    catch(err){
      next(err)
    }
  }
}