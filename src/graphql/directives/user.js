const { defaultFieldResolver } = require('graphql')
const { MapperKind, getDirective, mapSchema } = require('@graphql-tools/utils')
const crypt = require('bcryptjs')

const { showInfo } = require('../../utils/showLog')
const { USER_ERRORS } = require('../../constants/user')

// validate user input before registering
function userValidatorDirectiveTransformer (schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0]
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const { user: { email, password } } = args
          if (!email || !password) {
            throw USER_ERRORS.USER_MISSING_REQUIRE_WORDS
          }

          return resolve(source, args, context, info)
        }
      }
    }
  })
}

// check if the user exist before registering
function userExistenceVerifyDirectiveTransformer (schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0]
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const { user: { email } } = args
          const { dataSources } = context

          const res = await dataSources.userAPI.getUserByParams({ email })

          if (res?.dataValues) {
            throw USER_ERRORS.USER_ALREADY_EXIST
          }

          return resolve(source, args, context, info)
        }
      }
    }
  })
}

// crypt password
function cryptPasswordDirectiveTransformer (schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0]
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const { user: { password } } = args
          const salt = crypt.genSaltSync(10)
          args.user.password = crypt.hashSync(String(password), salt)
          showInfo('Success: password is encrypt successful')
          return resolve(source, args, context, info)
        }
      }
    }
  })
}

module.exports = {
  userValidatorDirectiveTransformer,
  userExistenceVerifyDirectiveTransformer,
  cryptPasswordDirectiveTransformer
}
