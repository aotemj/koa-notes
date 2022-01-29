const path = require('path')

const createResponse = require('../utils/response')
const { showInfo } = require('../utils/showLog')
const { HTTP_CODE, MSG_CODE } = require('../constants')

const upload = async (ctx) => {
  const filePath = path.basename(ctx.request.files?.file?.path)

  ctx.status = HTTP_CODE.SUCCESS
  const successMsg = 'upload successful'
  showInfo(successMsg)

  ctx.body = createResponse(MSG_CODE.CODE0, successMsg, {
    url: filePath
  })
}

module.exports = {
  upload
}
