const { directiveNames } = require('../directives')
const { USER_VALIDATOR, UPPER_CASE, USER_EXISTENCE_VERIFY } = directiveNames
const typeDef = `
   directive @${USER_VALIDATOR} on FIELD_DEFINITION
   directive @${USER_EXISTENCE_VERIFY} on FIELD_DEFINITION
    
   type User {
        id: ID!
        email: String! @${UPPER_CASE}
        password: String!
        name: String
        isAdmin: Int
   }
   
   type Query {
        users: [User]
        user(id: ID!):User
   }
   
   input NewUser {
        email:String!
        password: String!
        name: String
        isAdmin: Int
   }
      
   type Mutation {
        register(user: NewUser): User @${USER_VALIDATOR} @${USER_EXISTENCE_VERIFY}
        updateUser(id:ID!): User
        removeUser(id:ID!): Boolean
   }
`

module.exports = typeDef
