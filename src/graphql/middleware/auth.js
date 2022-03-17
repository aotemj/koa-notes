const jwt = require('jsonwebtoken')
const { JSON_WEB_TOKEN_SECRET } = require('../../config/config.default')

const auth = async (resolve, parent, args, context, info) => {
  const { authorization } = context.req.ctx.request.header
  const token = authorization.replace('Bearer ', '')

  return resolve(parent, { ...args, user: jwt.verify(token, JSON_WEB_TOKEN_SECRET) }, context, info)
}
module.exports = {
  auth
}
