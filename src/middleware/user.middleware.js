const crypt = require('bcryptjs')

const { USER_ERRORS } = require('../constants/user')
const { showInfo, showWarning } = require('../utils/showLog')
const { HTTP_CODE } = require('../constants')
const { getUserInfo } = require('../services/user.services')

const userValidator = async (ctx, next) => {
  const { email, password } = ctx.request.body
  if (!email || !password) {
    ctx.status = HTTP_CODE.BAD_REQUEST
    ctx.body = USER_ERRORS.USER_MISSING_REQUIRE_WORDS
    return
  }
  await next()
}

const userExistenceVerify = async (ctx, next) => {
  const { email } = ctx.request.body
  try {
    if (await getUserInfo({ email })) {
      showWarning(USER_ERRORS.USER_ALREADY_EXIST.message)
      ctx.status = HTTP_CODE.CONFLICT
      ctx.body = USER_ERRORS.USER_ALREADY_EXIST
      return ctx.app.emit('error', USER_ERRORS.USER_ALREADY_EXIST, ctx)
    }
  } catch (e) {
    ctx.app.emit('error', e, ctx)
  }

  await next()
}

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  try {
    const salt = crypt.genSaltSync(10)
    ctx.request.body.password = crypt.hashSync(String(password), salt)
  } catch (e) {
    ctx.app.emit('error', e, ctx)
  }
  showInfo('Success: password is encrypt successful')
  await next()
}

const verifyLogin = async (ctx, next) => {
  const { email, password } = ctx.request.body
  try {
    const res = await getUserInfo({ email })
    if (!res) {
      // user doesn't exist
      return ctx.app.emit('error', USER_ERRORS.USER_NOT_EXIST, ctx)
    }
    const compareRes = crypt.compareSync(password, res?.password)
    if (!compareRes) {
      return ctx.app.emit('error', USER_ERRORS.USER_NOT_EXIST, ctx)
    }
    ctx.request.body = res
    await next()
  } catch (e) {
    ctx.app.emit('error', e, ctx)
  }
}

module.exports = {
  userValidator,
  userExistenceVerify,
  cryptPassword,
  verifyLogin
}
