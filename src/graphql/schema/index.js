const userTypeDef = require('./user')

const Query = `
  
  type Query {
      _empty: String
  }
`

const typeDefs = [Query, userTypeDef]
module.exports = typeDefs
