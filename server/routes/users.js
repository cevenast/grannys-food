const router = require('express').Router()
const middleware = require('../middleware/middleware')
const userControllers = require('../controllers/users')

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:username', middleware.tokenExtractor, middleware.userExtractorLight, userControllers.getUser)
router.put('/setFavourite', middleware.tokenExtractor, middleware.userExtractor, userControllers.setFavourite)


module.exports = router