const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

class UserServices {
    async createUser({email, password, name}) {
        const res = await UserModel.findOne({email})
        if (!res) {
            const newUser = new UserModel({
                name,
                email,
                password: bcrypt.hashSync(password, salt),
            })
            return await newUser.save()
        } else {
            return false
        }
    }s
}

module.exports = new UserServices()