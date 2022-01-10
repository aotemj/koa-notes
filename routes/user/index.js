const Router = require('koa-router')

const router = new Router();

const register = require('./register')

router.use(register)

module.exports = router.routes();