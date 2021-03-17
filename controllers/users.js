const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const {HttpCode} = require('../helpers/constants')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

async function register (req, res, next) {
  const {email, password } = req.body
    try {
      const user = await Users.findByEmail(email)
if (user) {
    return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email in use'
    })
}

      const newUser = await Users.create(email, password)
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: {
          id: newUser.id,
          email: newUser.email,
          subscription: newUser.subscription,
        },
      })
    } catch (e) {
      next(e)
    }
  }

  const login = async (req, res, next) => {
    try {
      const { email,password } = req.body
        const user = await Users.findByEmail(email)
        const isValidPassword = await user.validPassword(password)
  if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
          status: 'error',
          code: HttpCode.UNAUTHORIZED,
          data: 'Unauthorized',
          message: 'Invalid credentials'
      })
  }
  
        const id = user._id
        const payload = { id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
        await Users.updateToken(id, token)

        return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          data: {
            token,
          },
        })
      } catch (e) {
        next(e)
      }
  }

  const logout = async (req, res, next) => {
    const id = req.user.id
    await Users.updateToken(id, null)
    return res.status(HttpCode.NO_CONTENT).json({
      message: 'No content'
    })

  }

  const current = async (req, res, next) => {
    try {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          id: req.user.id,
          email: req.user.email,
          subscription: req.user.subscription
        }
      })
    } catch (e) {
      next(e)
    }
  }

  const updateSubscription = async (req, res, next) => {
    try {
      const id = req.user.id
      const subscription = req.body.subscription
      await Users.updateSubscription(id, subscription)

      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          id: req.user.id,
          email: req.user.email,
          subscription
        }
      })
    } catch (e) {
      next(e)
    }
  }



  module.exports = {register, login, logout, current, updateSubscription}