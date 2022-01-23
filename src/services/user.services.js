const User = require('../models/user.model')
const {pick} = require('ramda')

class UserServices {
    async createUser({email, password, name}) {
        console.log(email, password, name);

        // if the user is not registered, it will be inserted to the user table
        if (!res) {
            return await User.create({
                email,
                password,
                name
            })
        } else {
            // if the user is existed, return false
            return false
        }
    }

    async getUserInfos({email, name, password, isAdmin}) {
        let searchOpt = {
            email,
            name,
            password,
            isAdmin
        }

        const res = await User.findOne({
            attributes: [],
            where: searchOpt
        })
    }
}

module.exports = new UserServices()