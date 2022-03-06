const { makeExecutableSchema } = require('@graphql-tools/schema')

const app = require('./app')
const { startApolloServer } = require('./graphql')
const typeDefs = require('./graphql/schema/index.js')
const resolvers = require('./graphql/resolvers/index.js')
const { upperDirectiveTransformer, directiveNames } = require('./graphql/directives')

// const {typeDefs, resolvers} = require('./graphql/schema')
let schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// uppercase
schema = upperDirectiveTransformer(schema, directiveNames.UPPER_CASE)

startApolloServer({ app, schema })
