const { gql } = require('apollo-server-koa')
const { v4: uuidv4 } = require('uuid')

// const {uu} = uuid

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
  
  input CreateArticleInput {
    title: String!
    body: String!
  }
  
  input UpdateArticleInput {
    title: String!
    body: String!
  }
  
  type Mutation {
    createArticle(article: CreateArticleInput):Article
    updateArticle(id:ID!,article: UpdateArticleInput):Article
  }
`
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
    }
  }
}

module.exports = {
  resolvers,
  typeDefs
}
