const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userController = require('../../../controllers/users')

router.post('/register', validate.createUser, userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)

module.exports = router
