const router = require('express').Router()
const loginController = require('../controllers/login')
const middleware = require('../middleware/middleware')

router.post('/', loginController.userLogIn)
router.get('/validateToken', middleware.tokenExtractor, middleware.userExtractor, loginController.validateToken )

module.exports = router