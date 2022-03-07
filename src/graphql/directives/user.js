const { defaultFieldResolver } = require('graphql')
const { MapperKind, getDirective, mapSchema } = require('@graphql-tools/utils')

const { USER_ERRORS } = require('../../constants/user')

// validate user input before register
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

function userExistenceVerifyDirectiveTransformer (schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0]
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const { user: { email, password } } = args
          const { dataSources } = context

          const res = await dataSources.userAPI.getUserByParams({ email, password })

          if (res?.dataValues) {
            throw USER_ERRORS.USER_ALREADY_EXIST
          }

          return resolve(source, args, context, info)
        }
      }
    }
  })
}

module.exports = {
  userValidatorDirectiveTransformer,
  userExistenceVerifyDirectiveTransformer
}
