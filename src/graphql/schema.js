const { gql } = require('apollo-server-koa')

const { books, articles } = require('./data')

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Foo {
    id: ID!
  }

  type Article {
     id: ID
     title: String
     body: String
  }
  
  type Query {
    books: [Book]
    userId: String
    foo: Foo!
    articles: [Article]
    article(id:ID!): Article
  }
`
const resolvers = {
  Query: {
    books: () => books,
    userId: () => '123',
    foo: () => {
      return { id: '123123123' }
    },
    article: (id) => {
      console.log(id)
      return articles.filter(item => id === item.id)[0]
    }
  }
}

module.exports = {
  resolvers,
  typeDefs
}
