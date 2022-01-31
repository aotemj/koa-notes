const path = require('path')
const { pick } = require('ramda')

const createResponse = require('../utils/response')
const { GOODS_ERRORS } = require('../constants/goods')
const { GOODS_INFOS } = require('../constants/goods')
const { showInfo } = require('../utils/showLog')
const { HTTP_CODE, MSG_CODE } = require('../constants')
const { createGoods } = require('../services/goods.services')

const upload = async (ctx) => {
  const filePath = path.basename(ctx.request.files?.file?.path)

  ctx.status = HTTP_CODE.SUCCESS
  const successMsg = 'upload successful'
  showInfo(successMsg)

  ctx.body = createResponse(MSG_CODE.CODE0, successMsg, {
    url: filePath
  })
}

const publish = async (ctx) => {
  try {
    const res = await createGoods(pick(['name', 'image', 'count', 'price'], ctx.request.body))
    ctx.status = HTTP_CODE.SUCCESS

    if (!res) {
      return ctx.app.emit('error', GOODS_ERRORS.GOODS_CREATE_ERRORS, ctx)
    }

    ctx.body = { ...GOODS_INFOS.GOODS_PUBLISH_SUCCESSFUL, data: pick(['name', 'image', 'price', 'id'], res) }
  } catch (e) {
    return ctx.app.emit('error', { ...GOODS_ERRORS.GOODS_CREATE_ERRORS, data: e }, ctx)
  }
}

module.exports = {
  upload,
  publish
}
