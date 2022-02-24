// const { gql } = require('apollo-server-koa')
const { v4: uuidv4 } = require('uuid')

const User = require('../models/user.model')

// const {uu} = uuid

const { books, articles, libraries } = require('./data')

// const typeDefs = gql`
//   type Foo {
//     id: ID!
//   }
//
//   type Article {
//      id: ID
//      title: String
//      body: String
//   }
//
//   type Library {
//     branch: String!
//     books: [Book!]
//   }
//
//   type Book {
//     title: String!
//     author: Author!
//   }
//
//   type Author {
//     name: String!
//   }
//
//   type Query {
//     books: [Book]
//     userId: String
//     foo: Foo!
//     articles: [Article]
//     article(id:ID!): Article
//     libraries: [Library]
//     users: [User]
//   }
//
//   input CreateArticleInput {
//     title: String!
//     body: String!
//   }
//
//   input UpdateArticleInput {
//     title: String!
//     body: String!
//   }
//
//   type Mutation {
//     createArticle(article: CreateArticleInput):Article
//     updateArticle(id:ID!,article: UpdateArticleInput):Article
//     remoteArticle(id:ID!): Boolean
//   }
// `
const resolvers = {
  Query: {
    books: () => books,
    userId: () => '123',
    foo: () => {
      return { id: '123123123' }
    },
    articles () {
      return articles
    },
    // resolvers 的参数： parent, args, info
    article: (_, { id }) => {
      return articles.filter(item => id === item.id)[0]
    },
    libraries: () => {
      return libraries
    }
  },
  Library: {
    books: (parent, args, context) => {
      console.log(context)
      return books.filter(book => book.branch === parent.branch)
    }
  },
  Book: {
    author (parent) {
      return {
        name: parent.author
      }
    }
  },
  Mutation: {
    createArticle (parent, { article }) {
      const id = uuidv4()
      articles.push({
        id,
        ...article
      })
    },
    updateArticle (_, { id, article }) {
      const targetArticle = articles.filter(article => article.id === id)[0]
      if (targetArticle) {
        targetArticle.title = article.title
        targetArticle.body = article.body
      }
    },
    remoteArticle (_, { id }) {
      const index = articles.findIndex(article => article.id === id)
      if (index !== -1) {
        articles.splice(index, 1)
        return true
      } else {
        return false
      }
    }
  }
}

module.exports = {
  resolvers
  // typeDefs
}
