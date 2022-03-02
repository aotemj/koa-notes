const { ApolloServer } = require('apollo-server-koa')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')

const { PORT: port } = require('../config/config.default')
const { showInfo } = require('../utils/showLog')
const context = require('./context')
const dataSources = require('./dataSources/index.js')

async function startApolloServer ({ schema, app }) {
  const httpServer = http.createServer()
  const server = new ApolloServer({
    schema,
    context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources
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
