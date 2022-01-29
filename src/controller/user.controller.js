const jwt = require('jsonwebtoken')
const { pick } = require('ramda')

const createResponse = require('../utils/response')
const { MSG_CODE, HTTP_CODE, ERRORS } = require('../constants')
const { createUser, getUserInfo, updatePassword } = require('../services/user.services')
const { JSON_WEB_TOKEN_SECRET } = require('../config/config.default')

class UserController {
  async login (ctx) {
    const userInfo = ctx.request.body
    const token = jwt.sign(pick(['id', 'email', 'name', 'isAdmin'], userInfo), JSON_WEB_TOKEN_SECRET)
    ctx.body = createResponse(MSG_CODE.CODE0, 'login successful', {
      token
    })
  }

  async register (ctx) {
    const { email, name, password } = ctx.request.body
    const res = await createUser({
      email,
      name,
      password
    })
    if (res) {
      const { email, name } = res
      ctx.body = createResponse(MSG_CODE.CODE0, 'register successful', {
        email, name
      })
    } else {
      ctx.body = ERRORS.USER_ALREADY_EXIST
    }
  }

  async info (ctx) {
    const { email, name, password } = ctx.request.query
    const res = await getUserInfo({ email, name, password })
    if (res) {
      ctx.status = HTTP_CODE.SUCCESS
      ctx.body = createResponse(MSG_CODE.CODE0, 'get info successful', res)
    } else {
      ctx.status = HTTP_CODE.NOT_FOUND
      ctx.body = ERRORS.USER_NOT_EXIST
    }
  }

  async updatePassword (ctx) {
    const { id } = ctx.state.user
    const { password: newPassword } = ctx.request.body
    try {
      await updatePassword({ id, newPassword })
    } catch (e) {
      return ctx.app.emit('error', e, ctx)
    }
    ctx.status = HTTP_CODE.SUCCESS
    ctx.body = createResponse(MSG_CODE.CODE0, 'update password successful')
  }
}

const userController = new UserController()

module.exports = userController
