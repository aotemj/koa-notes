/**
 * user dataSources
 */
const jwt = require('jsonwebtoken')
const R = require('ramda')

const User = require('../../models/user.model')
const { showInfo } = require('../../utils/showLog')
const { JSON_WEB_TOKEN_SECRET } = require('../../config/config.default')

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

  async login (userInfo) {
    const token = jwt.sign(R.pick(['id', 'email', 'name', 'isAdmin'], userInfo), JSON_WEB_TOKEN_SECRET)
    showInfo('login successful')
    return { token }
  }
}

module.exports = UserAPI
