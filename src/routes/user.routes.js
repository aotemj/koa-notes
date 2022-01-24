const Router = require('koa-router')
const router = new Router({
    prefix: '/api/users'
});

const {login, register, infos} = require('../controller/user.controller')
const {userValidator, userExistenceVerify} = require("../middleware/user.middleware");

router.post('/register', userValidator, userExistenceVerify, register)

router.post('/login', login)

router.get('/infos', infos)

module.exports = router.routes();