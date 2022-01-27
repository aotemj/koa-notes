const jwt = require('jsonwebtoken')
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

module.exports = {
  auth
}
