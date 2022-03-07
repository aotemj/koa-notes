/**
 * user resolvers
 */
const resolvers = {
  Query: {
    users: async (parent, { user }, { dataSources }) => {
      return await dataSources.userAPI.getAllUsers()
    },
    user: async (parent, { user }, { dataSources }) => {
      return await dataSources.userAPI.getUserByParams()
    }
  },
  Mutation: {
    async register (parent, { user }, { dataSources }) {
      return await dataSources.userAPI.createUser(user)
    }
  }
}

module.exports = resolvers
