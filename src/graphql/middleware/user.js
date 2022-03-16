const crypt = require('bcryptjs')
const { SCHEMA_TYPES } = require('../constant')
const { REGISTER, LOGIN } = require('../constant/user')

const { showInfo } = require('../../utils/showLog')
const { USER_ERRORS } = require('../../constants/user')
const createMiddleware = (type, schema, middleware) => {
  return {
    [type]: {
      [schema]: middleware
    }
  }
}

const userValidator = async (resolve, parent, args, context, info) => {
  const { user: { email, password } } = args
  if (!email || !password) {
    throw USER_ERRORS.USER_MISSING_REQUIRE_WORDS
  }

  return resolve(parent, args, context, info)
}

const userExistenceVerify = async (resolve, parent, args, context, info) => {
  const { user: { email } } = args
  const { dataSources: { userAPI } } = context

  const res = await userAPI.getUserByParams({ email })

  if (res?.dataValues) {
    throw USER_ERRORS.USER_ALREADY_EXIST
  }
  return resolve(parent, args, context, info)
}

const cryptPassword = async (resolve, parent, args, context, info) => {
  const { user: { password } } = args
  const salt = crypt.genSaltSync(10)
  args.user.password = crypt.hashSync(String(password), salt)
  showInfo('Success: password is encrypt successful')
  return resolve(parent, args, context, info)
}

const verifyLogin = async (resolve, parent, args, context, info) => {
  const { user: { email, password } } = args
  const { dataSources: { userAPI } } = context
  const res = await userAPI.getUserByParams({ email })
  if (!res) {
    // user doesn't exist
    throw USER_ERRORS.USER_NOT_EXIST
  }
  const userInfo = res?.dataValues
  const compareRes = crypt.compareSync(password, userInfo?.password)
  if (!compareRes) {
    throw USER_ERRORS.USER_NOT_EXIST
  }
  return resolve(parent, { ...args, user: userInfo }, context, info)
}

const registerMiddleware = [userValidator, userExistenceVerify, cryptPassword].map(middleware => (
  createMiddleware(SCHEMA_TYPES.MUTATION, REGISTER, middleware)))

const loginMiddleware = [userValidator, verifyLogin].map(middleware => (createMiddleware(SCHEMA_TYPES.MUTATION, LOGIN, middleware)))

module.exports = {
  userValidator,
  userExistenceVerify,
  cryptPassword,
  registerMiddleware,
  loginMiddleware
}
