const User = require('../../models/user.model')
const { createUser } = require('../../services/user.services')

const resolvers = {
  Query: {
    users: () => User.findAll()
  },
  Mutation: {
    async register (parent, { user }) {
      const res = await createUser(user)
      // console.log(res)
      return res
    }
  }
}

module.exports = resolvers
