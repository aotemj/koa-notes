const Router = require('koa-router')
const router = new Router({
    prefix: '/api/users'
});

const {login, register, infos} = require('../controller/user.controller')

router.post('/register', register)

router.post('/login', login)

router.get('/infos', infos)

module.exports = router.routes();