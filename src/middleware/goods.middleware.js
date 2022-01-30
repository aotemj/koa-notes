const { HTTP_CODE, ERRORS } = require('../constants')

const checkUploadedFileType = async (ctx, next) => {
  const fileType = ctx.request.files.file.type

  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
  if (!fileTypes.includes(fileType)) {
    ctx.status = HTTP_CODE.SUCCESS
    ctx.body = ERRORS.FILE_TYPE_ERROR
    return ctx.app.emit('error', ERRORS.FILE_TYPE_ERROR, ctx)
  }
  await next()
}

const validator = async (ctx, next) => {
  const types = { string: { type: 'string' }, number: { type: 'number' } }
  const requiredEnum = { required: { required: true }, notRequired: { required: false } }
  try {
    ctx.verifyParams({
      goodsName: { ...types.string, ...requiredEnum.required },
      goodsImg: { ...types.string, ...requiredEnum.required },
      goodsCount: { ...types.number, ...requiredEnum.required },
      goodsPrice: { ...types.number, ...requiredEnum.required }
    })
  } catch (e) {
    ctx.app.emit('error', e, ctx)
  }

  await next()
}

module.exports = {
  checkUploadedFileType,
  validator
}
