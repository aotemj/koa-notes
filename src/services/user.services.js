const User = require('../models/user.model')
const R = require('ramda')

class UserServices {
    async createUser({email, password, name}) {
        await User.create({
            email,
            password,
            name
        })
    }

    async getUserInfo({email, name, password, isAdmin}) {
        let searchOpt = {
            email,
            name,
            password,
            isAdmin
        }
        console.log(searchOpt, R.pickBy((item) => !R.not(item), searchOpt));
        const res = await User.findOne({
            attributes: ['email', 'name', 'password', 'isAdmin'],
            where: R.pickBy((item) => !R.not(item) && item, searchOpt)
        })
        return res || null
    }
}

module.exports = new UserServices()