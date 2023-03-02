const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer")
const recipesController = require("../controllers/recipes")


router.get("/recipes", recipesController.getAll)
router.post("/recipes", recipesController.newRecipe)

module.exports = router