const { REGISTER, LOGIN, USER, USERS, UPDATE_PASSWORD } = require('../constant/user')
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
   
   input UpdatePasswordParams {
        id: ID!
        password:String!
   }
   
      
   type Mutation {
        ${REGISTER}(user: NewUser): User
        updateUser(id:ID!): User
        removeUser(id:ID!): Boolean
        ${LOGIN}(user:LoginUser): LoginRes
        ${UPDATE_PASSWORD}(user: UpdatePasswordParams): Boolean
   }
`

module.exports = typeDef
