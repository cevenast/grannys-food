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
    try{
      const recipes = await Recipe.find({}).sort({ createdAt: 'desc' }).lean().populate('user', { username: 1, _id: 1 })
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
        title: body.title,
        description: body.description,
        longDescription:body.longDescription,
        ingredients: body.ingredients.split('\n'),
        directions: body.directions.split('\n'),
        tags: JSON.parse(body.tags),
        imgSrc: cloudinaryRes.secure_url,
        cloudinaryId: cloudinaryRes.public_id,
        user: user._id,
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
      next(err)
    }
  }
}