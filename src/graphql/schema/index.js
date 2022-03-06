const userTypeDef = require('./user')
const { directiveNames } = require('../directives')

const Query = `
  directive @${directiveNames.UPPER_CASE} on FIELD_DEFINITION
  
  type Query {
      _empty: String
  }
`

const typeDefs = [Query, userTypeDef]
module.exports = typeDefs
