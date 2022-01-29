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

module.exports = {
  checkUploadedFileType
}
