const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");

module.exports = {
    getAll: async(req,res) => {
        try{
            const recipes = await Recipe.find().sort({ createdAt: "desc" }).lean()
            res.json(recipes)
        }
        catch(err){
            console.log(err)
        }
    },

    newRecipe: (req,res) => res.json('hola')


}