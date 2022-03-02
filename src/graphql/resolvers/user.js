/**
 * user resolvers
 */
const resolvers = {
  Query: {
    users: async (parent, { user }, { dataSources }) => {
      return await dataSources.userAPI.getAllUsers()
    }
  },
  Mutation: {
    async register (parent, { user }, { dataSources }) {
      return await dataSources.userAPI.createUser(user)
    }
  }
}

module.exports = resolvers
