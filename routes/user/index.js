const Router = require('koa-router')

const router = new Router();

const register = require('./register')
const login = require('./login')

router.use(register)
router.use(login)

module.exports = router.routes();