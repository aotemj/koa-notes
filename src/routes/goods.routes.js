const Router = require('koa-router')

const { upload, publish, update } = require('../controller/goods.controller')
const { auth, checkAdminPermission } = require('../middleware/auth.middleware')
const { checkUploadedFileType, publishValidator, getGoodsId, goodsExistenceVerify, updateValidator } = require('../middleware/goods.middleware')

const router = new Router({
  prefix: '/api/goods'
})

// upload goods image
router.post('/upload', auth, checkAdminPermission, checkUploadedFileType, upload)

// create goods
router.post('/', auth, checkAdminPermission, publishValidator, publish)

// update goods
router.put('/:id', auth, checkAdminPermission, updateValidator, getGoodsId, goodsExistenceVerify, update)

module.exports = router.routes()
