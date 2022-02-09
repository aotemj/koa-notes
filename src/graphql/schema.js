const { gql } = require('apollo-server-koa')

const { books } = require('./data')

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`
const resolvers = {
  Query: {
    books: () => books
  }
}

module.exports = {
  resolvers,
  typeDefs
}
