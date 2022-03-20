const { GOODS_ERRORS } = require('../../constants/goods')
const checkUploadedFileType = async (resolve, parent, args, context, info) => {
  const { type: fileType } = args.files.file

  const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']
  if (!fileTypes.includes(fileType)) {
    throw GOODS_ERRORS.FILE_TYPE_ERROR
  }
  return resolve(parent, args, context, info)
}

// goods validator
// const publishValidator = async (resolve, parent, args, context, info) => {
//   const types = { string: { type: 'string' }, number: { type: 'number' } }
//   const requiredEnum = { required: { required: true }, notRequired: { required: false } }
//   try {
//     // name: goods name;image: goods image;count: goods count;price: goods price
//     ctx.verifyParams({
//       name: { ...types.string, ...requiredEnum.required },
//       image: { ...types.string, ...requiredEnum.required },
//       count: { ...types.number, ...requiredEnum.required },
//       price: { ...types.number, ...requiredEnum.required }
//     })
//   } catch (e) {
//     ctx.status = HTTP_CODE.SUCCESS
//     ctx.body = { ...GOODS_ERRORS.GOODS_PUBLISH_VALIDATE_ERRORS, data: e.errors }
//     return ctx.app.emit('error', e, ctx)
//   }
//
//   await next()
// }
//
