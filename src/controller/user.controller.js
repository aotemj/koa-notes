// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const createResponse = require("../utils/response");
const {createUser, getUserInfo} = require('../services/user.services')


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
        const {email, name, password} = ctx.request.body
        console.log(email, name, password);
        const res = await createUser({
            email,
            name,
            password
        })
        if (res) {
            const {email, name} = res
            ctx.body = createResponse('00000', 'register successful', {
                email, name
            })
        } else {
            ctx.body = createResponse('00003', 'email is already exist')
        }
    }

    async infos(ctx) {
        const {email,name,password} = ctx.request.query
        const res = await getUserInfo({email, name, password})
        if (res) {
            ctx.status = 200
            ctx.body = createResponse('00000', 'get info successful', res)
        } else {
            ctx.status = 404
            ctx.body = createResponse('00005', `user doesn't exist`)
        }
    }
}


const
    userController = new UserController()

module
    .exports = userController