const app = require('./app')
const { startApolloServer } = require('./graphql')
const { typeDefs, resolvers } = require('./graphql/schema')

startApolloServer({ app, typeDefs, resolvers })
