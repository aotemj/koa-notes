const R = require('ramda')

const User = require('../models/user.model')

class UserServices {
  async createUser ({ email, password, name }) {
    const user = await User.create({
      email,
      password,
      name
    })
    return user?.dataValues
  }

  async getUserInfo ({ email, name = '', password = '', isAdmin = '' }) {
    const searchOpt = {
      email,
      name,
      password,
      isAdmin
    }
    const res = await User.findOne({
      attributes: ['email', 'name', 'password', 'isAdmin', 'id'],
      where: R.pickBy((item) => !R.not(item), searchOpt)
    })
    return res?.dataValues || null
  }

  async updatePassword ({ id, newPassword }) {
    const user = await User.findOne({
      where: id
    })

    await user.update({
      password: newPassword
    })
    await user.save()
  }
}

module.exports = new UserServices()
