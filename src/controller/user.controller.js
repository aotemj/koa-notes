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
        const {email, name} = ctx.request.body
        if (await getUserInfo({email, name})) {
            ctx.status = 409
            ctx.body = createResponse('00002', 'user is already exist', {})
            return
        }
        const res = await createUser({
            email,
            name,
        })
        if (res) {
            const {email, name} = res
            ctx.body = createResponse('0', 'register successful', {
                email, name
            })
        } else {
            ctx.body = createResponse('00003', 'email is already exist')
        }
    }

    async infos(ctx) {

    }
}


const
    userController = new UserController()

module
    .exports = userController