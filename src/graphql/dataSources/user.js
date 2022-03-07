/**
 * user dataSources
 */
const R = require('ramda')

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

  async getUserByParams (params) {
    // const { email, name = '', password = '', isAdmin = '' } = params
    // const searchOpt = {
    //   email,
    //   name,
    //   password,
    //   isAdmin
    // }
    return await User.findOne({
      attributes: ['email', 'name', 'password', 'isAdmin', 'id'],
      where: R.pickBy(item => !R.not(item), params)
    })
  }
}

module.exports = UserAPI
