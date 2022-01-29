const createResponse = require('../utils/response')

const MSG_CODE = {
  CODE0: '00000',
  CODE1: '00001',
  CODE2: '00002',
  CODE3: '00003',
  CODE4: '00004',
  CODE5: '00005',
  CODE6: '00006'
}

const ERRORS = {
  USER_ALREADY_EXIST: createResponse(MSG_CODE.CODE1, 'User is already exist'),
  USER_MISSING_REQUIRE_WORDS: createResponse(MSG_CODE.CODE2, 'Email or password is missing'),
  USER_NOT_EXIST: createResponse(MSG_CODE.CODE3, 'User doesn\'t exist'),
  USER_LOGIN_ERROR: createResponse(MSG_CODE.CODE4, 'The username or password is incorrect'),
  USER_IS_NOT_ADMIN_ERROR: createResponse(MSG_CODE.CODE5, 'The user is not administrator'),
  FILE_TYPE_ERROR: createResponse(MSG_CODE.CODE6, 'This file type is not supported'),
}

const HTTP_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
}

module.exports = {
  MSG_CODE,
  HTTP_CODE,
  ERRORS
}
