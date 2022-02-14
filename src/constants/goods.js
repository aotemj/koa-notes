const createResponse = require('../utils/response')
const { MSG_CODE } = require('./index')

const GOODS_ERRORS = {
  FILE_TYPE_ERROR: createResponse(MSG_CODE.CODE6, 'This file type is not supported'),
  GOODS_PUBLISH_VALIDATE_ERRORS: createResponse(MSG_CODE.CODE7, 'Goods publish params validate failed'),
  GOODS_CREATE_ERRORS: createResponse(MSG_CODE.CODE9, 'Goods create failed'),
  GOODS_UPDATE_ERROR: createResponse(MSG_CODE.CODE10, 'Goods update failed'),
  GOODS_DO_NOT_EXIST: createResponse(MSG_CODE.CODE12, 'The Goods you wanted is not exist')
}

const GOODS_INFOS = {
  GOODS_PUBLISH_SUCCESSFUL: createResponse(MSG_CODE.CODE8, 'Goods publish successful'),
  GOODS_UPDATE_SUCCESSFUL: createResponse(MSG_CODE.CODE11, 'Goods update successful')
}

module.exports = {
  GOODS_ERRORS,
  GOODS_INFOS
}
