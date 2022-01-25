const Router = require('koa-router')
const router = new Router({
    prefix: '/api/users'
});

const {login, register, info} = require('../controller/user.controller')

const {userValidator, userExistenceVerify, cryptPassword} = require("../middleware/user.middleware");

router.post('/register', userValidator, userExistenceVerify, cryptPassword, register)

router.post('/login', login)

router.get('/info', info)

module.exports = router.routes();