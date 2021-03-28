const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')
const {createAccLimiter} = require('../../../helpers/rate-limit-reg')


router.post('/register', createAccLimiter, validate.createUser, userController.register)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)
router.get('/current', guard, userController.current);

router.patch('/sub', guard, validate.updateSubscription, userController.updateSubscription);
router.patch('/avatar', guard, upload.single('avatar'), validate.uploadAvatar, userController.avatar)

router.get('/verify/:verificationToken', userController.verify)

module.exports = router
