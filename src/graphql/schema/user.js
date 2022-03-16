const { REGISTER, LOGIN, USER, USERS } = require('../constant/user')
const typeDef = `
    
   type User {
        id: ID!
        email: String!
        password: String!
        name: String
        isAdmin: Int
   }
   
   type Query {
        ${USERS}: [User]
        ${USER}(id: ID!):User
   }
   
   input LoginUser {
        email: String!
        password: String!
   }
   
   type LoginRes {
        token: String!
   }
   
   input NewUser {
        email:String!
        password: String!
        name: String
        isAdmin: Int
   }
   
      
   type Mutation {
        ${REGISTER}(user: NewUser): User
        updateUser(id:ID!): User
        removeUser(id:ID!): Boolean
        ${LOGIN}(user:LoginUser): LoginRes
   }
`

module.exports = typeDef
