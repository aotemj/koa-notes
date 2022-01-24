const User = require('../models/user.model')
const R = require('ramda')

class UserServices {
    async createUser({email, password, name}) {
        const user =  await User.create({
            email,
            password,
            name,
        })
        console.log('user', user);
        return user?.dataValues
    }

    async getUserInfo({email, name, password='', isAdmin=''}) {
        let searchOpt = {
            email,
            name,
            password,
            isAdmin
        }
        const res = await User.findOne({
            attributes: ['email', 'name'],
            where: R.pickBy((item) => !R.not(item), searchOpt)
        })
        return res || null
    }
}

module.exports = new UserServices()