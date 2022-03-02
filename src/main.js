const { makeExecutableSchema } = require('@graphql-tools/schema')

const app = require('./app')
const { startApolloServer } = require('./graphql')
const typeDefs = require('./graphql/schema/index.js')
const resolvers = require('./graphql/resolvers/index.js')

// const {typeDefs, resolvers} = require('./graphql/schema')
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

startApolloServer({ app, schema })
