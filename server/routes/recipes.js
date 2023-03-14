const router = require('express').Router()
//const upload = require('../middleware/multer')
const recipesController = require('../controllers/recipes')
const middleware = require('../middleware/middleware')
const upload = require('../middleware/multer')


router.get('/', recipesController.getAll)
router.get('/:id', recipesController.getRecipe)
router.post('/', middleware.tokenExtractor, middleware.userExtractor, upload.single('img'), recipesController.newRecipe)


module.exports = router