const Router = require('koa-router')

const { upload, publish } = require('../controller/goods.controller')
const { auth, checkAdminPermission } = require('../middleware/auth.middleware')
const { checkUploadedFileType, validator } = require('../middleware/goods.middleware')

const router = new Router({
  prefix: '/api/goods'
})

router.post('/upload', auth, checkAdminPermission, checkUploadedFileType, upload)

router.post('/publish', auth, checkAdminPermission, validator, publish)

module.exports = router.routes()
