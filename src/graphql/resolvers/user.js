/**
 * user resolvers
 */
const { REGISTER, USERS, USER, LOGIN } = require('../constant/user')
const { SCHEMA_TYPES } = require('../constant/index')
const { QUERY, MUTATION } = SCHEMA_TYPES
const resolvers = {
  [QUERY]: {
    [USERS]: async (parent, { user }, { dataSources: { userAPI } }) => {
      return await userAPI.getAllUsers()
    },
    [USER]: async (parent, { user }, { dataSources: { userAPI } }) => {
      return await userAPI.getUserByParams()
    }
  },
  [MUTATION]: {
    async [REGISTER] (parent, { user }, { dataSources: { userAPI } }) {
      return await userAPI.createUser(user)
    },
    async [LOGIN] (parent, { user }, { dataSources: { userAPI } }) {
      return await userAPI.login(user)
    }
  }
}

module.exports = resolvers
