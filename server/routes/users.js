const router = require('express').Router()
const userControllers = require('../controllers/users')

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)
router.get('/:username', userControllers.getUser)


module.exports = router