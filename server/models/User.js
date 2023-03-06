const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    trim: true,
    required: true,
    unique: true,
    minLength: [1, 'username must have at least 1 character'],
    maxLength: 20
  },
  passwordHash:{
    type: String,
    required: true
  },
  favoriteRecipes: Array,
  email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) // eslint-disable-line
      },
      message: 'Please enter a valid email'
    },
    required: true

  },
  creationDate:{
    type:Date,
    required: true
  }
})

userSchema.plugin(uniqueValidator, { message: 'Username already exists.' }) // verifies that username is unique

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User