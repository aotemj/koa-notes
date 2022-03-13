const { makeExecutableSchema } = require('@graphql-tools/schema')

const app = require('./app')
const { startApolloServer } = require('./graphql')
const typeDefs = require('./graphql/schema/index.js')
const resolvers = require('./graphql/resolvers/index.js')
const {
  directiveNames,
  userValidatorDirectiveTransformer,
  userExistenceVerifyDirectiveTransformer,
  cryptPasswordDirectiveTransformer
} = require('./graphql/directives')

// const {typeDefs, resolvers} = require('./graphql/schema')
let schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

schema = cryptPasswordDirectiveTransformer(schema, directiveNames.CRYPT_PASSWORD)
schema = userExistenceVerifyDirectiveTransformer(schema, directiveNames.USER_EXISTENCE_VERIFY)
schema = userValidatorDirectiveTransformer(schema, directiveNames.USER_VALIDATOR)

startApolloServer({ app, schema })
