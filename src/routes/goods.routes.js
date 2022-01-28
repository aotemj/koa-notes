const Router = require('koa-router')
const { upload } = require('../controller/goods.controller')
const { auth, checkAdminPermission } = require('../middleware/auth.middleware')
const router = new Router({
  prefix: '/api/goods'
})

router.post('/upload', auth, checkAdminPermission, upload)

module.exports = router.routes()
