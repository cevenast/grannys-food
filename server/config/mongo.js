const mongoose = require('mongoose')

// Mongo Connection

async function connectMongo(){
  mongoose.set('strictQuery', false)
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB!')
  }
  catch(err){
    console.log('Error connecting to MongoDB', err.message)
  }
}

module.exports = connectMongo