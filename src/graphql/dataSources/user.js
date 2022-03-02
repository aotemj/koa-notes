/**
 * user dataSources
 */
const User = require('../../models/user.model')

class UserAPI {
  async createUser ({ email, password, name }) {
    const user = await User.create({
      email,
      password,
      name
    })
    return user?.dataValues
  }

  async getAllUsers () {
    return await User.findAll()
  }
}

module.exports = UserAPI
