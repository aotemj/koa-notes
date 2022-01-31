const createResponse = require('../utils/response')
const { MSG_CODE } = require('./index')

const GOODS_ERRORS = {
  FILE_TYPE_ERROR: createResponse(MSG_CODE.CODE6, 'This file type is not supported'),
  GOODS_PUBLISH_VALIDATE_ERRORS: createResponse(MSG_CODE.CODE7, 'Goods publish params validate failed'),
  GOODS_CREATE_ERRORS: createResponse(MSG_CODE.CODE9, 'Goods create failed')
}

const GOODS_INFOS = {
  GOODS_PUBLISH_SUCCESSFUL: createResponse(MSG_CODE.CODE8, 'Goods publish successful')
}

module.exports = {
  GOODS_ERRORS,
  GOODS_INFOS
}
