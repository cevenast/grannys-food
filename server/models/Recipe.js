const mongoose = require('mongoose')

// Set Schema

const recipeSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  imgSrc: {
    type:String,
    required:true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  favoriteOf:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  favoriteCount:{
    type: Number,
    required: true
  },
  description: {
    type:String,
    required:true
  },
  longDescription:{
    type:String,
    required:true
  },
  ingredients:{
    type:Array,
    required:true
  },
  directions:{
    type:Array,
    required:true,
  },
  tags:{
    type:Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

// Formats the recipes response, transforming id into a string and removing the __v

recipeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema) // Model Definition (constructor)
module.exports = Recipe