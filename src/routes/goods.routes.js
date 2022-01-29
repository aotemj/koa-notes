const Router = require('koa-router')
const { upload } = require('../controller/goods.controller')
const { auth, checkAdminPermission } = require('../middleware/auth.middleware')
const { checkUploadedFileType } = require('../middleware/goods.middleware')
const router = new Router({
  prefix: '/api/goods'
})

router.post('/upload', auth, checkAdminPermission, checkUploadedFileType, upload)

module.exports = router.routes()
