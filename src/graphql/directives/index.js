const { defaultFieldResolver } = require('graphql')
const { MapperKind, getDirective, mapSchema } = require('@graphql-tools/utils')
const directiveNames = require('./directiveName')
const {
  userValidatorDirectiveTransformer,
  userExistenceVerifyDirectiveTransformer
} = require('./user')

function upperDirectiveTransformer (schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0]
      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info)
          if (typeof result === 'string') {
            return result.toUpperCase()
          }
          return result
        }
      }
    }
  })
}

module.exports = {
  userExistenceVerifyDirectiveTransformer,
  userValidatorDirectiveTransformer,
  upperDirectiveTransformer,
  directiveNames
}
