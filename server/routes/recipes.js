const router = require('express').Router()
//const upload = require('../middleware/multer')
const recipesController = require('../controllers/recipes')
const middleware = require('../middleware/middleware')


router.get('/', recipesController.getAll)
router.post('/', middleware.tokenExtractor, middleware.userExtractor, recipesController.newRecipe)


module.exports = router