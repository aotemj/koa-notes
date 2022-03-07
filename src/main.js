const { makeExecutableSchema } = require('@graphql-tools/schema')

const app = require('./app')
const { startApolloServer } = require('./graphql')
const typeDefs = require('./graphql/schema/index.js')
const resolvers = require('./graphql/resolvers/index.js')
const {
  directiveNames,
  upperDirectiveTransformer,
  userValidatorDirectiveTransformer,
  userExistenceVerifyDirectiveTransformer
} = require('./graphql/directives')

// const {typeDefs, resolvers} = require('./graphql/schema')
let schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// uppercase
schema = upperDirectiveTransformer(schema, directiveNames.UPPER_CASE)
schema = userValidatorDirectiveTransformer(schema, directiveNames.USER_VALIDATOR)
schema = userExistenceVerifyDirectiveTransformer(schema, directiveNames.USER_EXISTENCE_VERIFY)

startApolloServer({ app, schema })
