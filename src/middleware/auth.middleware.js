const jwt = require('jsonwebtoken')

const { USER_ERRORS } = require('../constants/user')
const { HTTP_CODE } = require('../constants')
const { JSON_WEB_TOKEN_SECRET } = require('../config/config.default')

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    ctx.state.user = jwt.verify(token, JSON_WEB_TOKEN_SECRET)
  } catch (e) {
    return ctx.app.emit('error', e, ctx)
  }

  await next()
}

const checkAdminPermission = async (ctx, next) => {
  const { isAdmin } = ctx.state.user
  if (!isAdmin) {
    ctx.status = HTTP_CODE.FORBIDDEN
    ctx.body = USER_ERRORS.USER_IS_NOT_ADMIN_ERROR
    return ctx.app.emit('error', USER_ERRORS.USER_IS_NOT_ADMIN_ERROR, ctx)
  }
  await next()
}

module.exports = {
  auth,
  checkAdminPermission
}
