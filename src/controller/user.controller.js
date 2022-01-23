// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const {createUser} = require('../services/user.services')


class UserController {
    async login(ctx) {
        // const {email, password} = ctx.request.body
        //
        // const res = await UserModel.findOne({
        //     email
        // })
        // if (res) {
        //     const passwordFromDB = res.password;
        //     const compareRes = bcrypt.compareSync(password, passwordFromDB)
        //     const token = `Bearer ${jwt.sign({email, password}, keys.secret)}`
        //     console.log(compareRes);
        //     if (compareRes) {
        //         ctx.status = 200
        //         ctx.body = {
        //             msg: "login successful",
        //             token
        //         }
        //     }
        // } else {
        //     ctx.status = 500
        //     ctx.body = {
        //         msg: 'The username or password is incorrect'
        //     }
        // }
    }

    async register(ctx) {
        const {email,name} = ctx.request.body
        const res = await createUser({
            email,
            name,
        })
        if (res) {
            const {email,name} = res
            ctx.body = {
                code: 0,
                msg: 'register successful',
                data: {
                    email,
                    name
                }
            }
        } else {
            ctx.body = {
                code: 500,
                msg: 'email is already exist',
                data: {}
            }
        }
    }

    async infos(ctx) {
        const {request: {header: {authorization}}} = ctx
        // const veracity = jwt.verify(authorization.split(' ')[1], keys.secret)
        console.log(ctx);
        // const {email} = veracity
        // const res = await User.findOne({
        //     email
        // })
        ctx.body = {
            code: 200,
            msg: 'success',
            data: ''
        }
    }
}


const userController = new UserController()

module.exports = userController