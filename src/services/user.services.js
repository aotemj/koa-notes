// const UserModel = require("../models/User");
// const bcrypt = require("bcrypt");
const User = require('../models/user.model')

// const saltRounds = 10;

// const salt = bcrypt.genSaltSync(saltRounds);

class UserServices {
    async createUser({email, password, name}) {
        console.log(email, password, name);
        const res = User.findOne({
            email
        })
        if (!res) {
            const res = await User.create({
                email,
                password,
                name
            })
            console.log(res);
            return res
            // const newUser = new UserModel({
            //     name,
            //     email,
            //     password: bcrypt.hashSync(password, salt),
            // })
            // return await newUser.save()
        } else {
            return false
        }
    }

    s
}

module.exports = new UserServices()