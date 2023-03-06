//const cloudinary = require('../middleware/cloudinary')
const Recipe = require('../models/Recipe')

module.exports = {

  //////////////////////
  // Get all recipes  //
  //////////////////////

  getAll: async(req,res,next) => {
    try{
      const recipes = await Recipe.find().sort({ createdAt: 'desc' }).lean()
      res.json(recipes)
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
      // Middleware tokenExtractor checks for token in the headers and sets it to req.token
      // Middleware userExtractor verifies the token and sets the corresponding user to req.user

      const newRecipe = new Recipe ({
        title: body.title,
        description: body.description,
        tags: body.tags,
        imgSrc: 'https://res.cloudinary.com/dwzpy0lxt/image/upload/v1677726373/pastel-de-choclo_gnifbm.jpg',
        userId: req.userId,
        username:req.username,
        createdAt: new Date()
      })

      const savedRecipe = await newRecipe.save()
      console.log(`${req.username}'s recipe: ${body.title} was saved`)
      res.json(savedRecipe)
    }
    catch(err){
      next()
    }
  }
}