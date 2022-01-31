const createResponse = require('../utils/response')
const { MSG_CODE } = require('./index')

const USER_ERRORS = {
  USER_ALREADY_EXIST: createResponse(MSG_CODE.CODE1, 'User is already exist'),
  USER_MISSING_REQUIRE_WORDS: createResponse(MSG_CODE.CODE2, 'Email or password is missing'),
  USER_NOT_EXIST: createResponse(MSG_CODE.CODE3, 'User doesn\'t exist'),
  USER_LOGIN_ERROR: createResponse(MSG_CODE.CODE4, 'The username or password is incorrect'),
  USER_IS_NOT_ADMIN_ERROR: createResponse(MSG_CODE.CODE5, 'The user is not administrator')
}

module.exports = {
  USER_ERRORS
}
