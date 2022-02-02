const { GOODS_ERRORS } = require('../constants/goods')
const { HTTP_CODE } = require('../constants')
const { getGoodsInfo } = require('../services/goods.services')
const { showError } = require('../utils/showLog')

const checkUploadedFileType = async (ctx, next) => {
  const fileType = ctx.request.files.file.type

  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
  if (!fileTypes.includes(fileType)) {
    ctx.status = HTTP_CODE.SUCCESS
    ctx.body = GOODS_ERRORS.FILE_TYPE_ERROR
    return ctx.app.emit('error', GOODS_ERRORS.FILE_TYPE_ERROR, ctx)
  }
  await next()
}

// goods validator
const publishValidator = async (ctx, next) => {
  const types = { string: { type: 'string' }, number: { type: 'number' } }
  const requiredEnum = { required: { required: true }, notRequired: { required: false } }
  try {
    // name: goods name;image: goods image;count: goods count;price: goods price
    ctx.verifyParams({
      name: { ...types.string, ...requiredEnum.required },
      image: { ...types.string, ...requiredEnum.required },
      count: { ...types.number, ...requiredEnum.required },
      price: { ...types.number, ...requiredEnum.required }
    })
  } catch (e) {
    ctx.status = HTTP_CODE.SUCCESS
    ctx.body = { ...GOODS_ERRORS.GOODS_PUBLISH_VALIDATE_ERRORS, data: e.errors }
    return ctx.app.emit('error', e, ctx)
  }

  await next()
}

const updateValidator = async (ctx, next) => {
  const types = { string: { type: 'string' }, number: { type: 'number' } }
  const requiredEnum = { required: { required: true }, notRequired: { required: false } }
  try {
    // name: goods name;image: goods image;count: goods count;price: goods price
    ctx.verifyParams({
      name: { ...types.string, ...requiredEnum.notRequired },
      image: { ...types.string, ...requiredEnum.notRequired },
      count: { ...types.number, ...requiredEnum.notRequired },
      price: { ...types.number, ...requiredEnum.notRequired }
    })
  } catch (e) {
    ctx.status = HTTP_CODE.SUCCESS
    ctx.body = { ...GOODS_ERRORS.GOODS_UPDATE_ERROR, data: e.errors }
    return ctx.app.emit('error', e, ctx)
  }

  await next()
}

const getGoodsId = async (ctx, next) => {
  const regExp = /\/goods\/(\d)+$/
  ctx.state.goodsId = ctx.request.url.match(regExp)?.[1]
  await next()
}

const goodsExistenceVerify = async (ctx, next) => {
  const goodsId = ctx.state?.goodsId
  try {
    const goods = await getGoodsInfo(goodsId)
    if (!goods) {
      showError(GOODS_ERRORS.GOODS_DO_NOT_EXIST.message)
      ctx.status = HTTP_CODE.SUCCESS
      ctx.body = GOODS_ERRORS.GOODS_DO_NOT_EXIST
      return ctx.app.emit('error', GOODS_ERRORS.GOODS_DO_NOT_EXIST, ctx)
    }
    ctx.state.goodsInfo = goods
  } catch (e) {
    ctx.app.emit('error', e, ctx)
  }
  await next()
}
module.exports = {
  checkUploadedFileType,
  publishValidator,
  getGoodsId,
  goodsExistenceVerify,
  updateValidator
}
