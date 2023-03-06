const router = require('express').Router()
const userControllers = require('../controllers/users')

router.post('/', userControllers.createUser)
router.get('/', userControllers.getAllUsers)


module.exports = router