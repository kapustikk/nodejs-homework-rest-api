const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guard');


router.post('/register', validate.createUser, userController.register)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)

module.exports = router
