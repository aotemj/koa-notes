const User = require('../models/user.model')

class UserServices {
    async createUser({email, password, name}) {
        console.log(email, password, name);
        const res = await User.findOne({
            where:{
                email
            }
        })
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
}

module.exports = new UserServices()