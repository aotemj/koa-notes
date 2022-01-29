const Router = require('koa-router')

const router = new Router({
  prefix: '/api/users'
})

const { login, register, info, updatePassword } = require('../controller/user.controller')

const { userValidator, userExistenceVerify, cryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')

router.post('/register', userValidator, userExistenceVerify, cryptPassword, register)

router.post('/login', userValidator, verifyLogin, login)

router.get('/info', info)

router.patch('/password', auth, cryptPassword, updatePassword)

module.exports = router.routes()
