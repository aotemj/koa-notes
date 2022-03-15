const typeDef = `
    
   type User {
        id: ID!
        email: String!
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
        register(user: NewUser): User
        updateUser(id:ID!): User
        removeUser(id:ID!): Boolean
   }
`

module.exports = typeDef
