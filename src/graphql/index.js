const { ApolloServer } = require('apollo-server-koa')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { PORT: port } = require('../config/config.default')
const { showInfo } = require('../utils/showLog')

const http = require('http')

async function startApolloServer ({ typeDefs, resolvers, app }) {
  const httpServer = http.createServer()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })

  await server.start()
  server.applyMiddleware({ app })
  httpServer.on('request', app.callback())
  await new Promise(resolve => httpServer.listen({ port }, resolve))
  showInfo(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  return { server, app }
}

module.exports = {
  startApolloServer
}
