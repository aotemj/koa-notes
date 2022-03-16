const crypt = require('bcryptjs')
const { SCHEMA_TYPES } = require('../constant')
const { REGISTER } = require('../constant/user')

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
  const { dataSources } = context

  const res = await dataSources.userAPI.getUserByParams({ email })

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

const registerMiddleware = [userValidator, userExistenceVerify, cryptPassword].map(middleware => (
  createMiddleware(SCHEMA_TYPES.MUTATION, REGISTER, middleware)))

module.exports = {
  userValidator,
  userExistenceVerify,
  cryptPassword,
  registerMiddleware
}
