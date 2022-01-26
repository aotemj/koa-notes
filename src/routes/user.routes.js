const Router = require('koa-router')

const router = new Router({
    prefix: '/api/users'
});

const {login, register, info} = require('../controller/user.controller')

const {userValidator, userExistenceVerify, cryptPassword, verifyLogin} = require("../middleware/user.middleware");

router.post('/register', userValidator, userExistenceVerify, cryptPassword, register)

router.post('/login', userValidator, verifyLogin, login)

router.get('/info', info)

module.exports = router.routes();