const Router = require('koa-router')
const bcrypt = require("bcrypt");

const UserModel = require("../../models/User");

const router = new Router();
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);
router.post('/register', async ctx => {
    const {email, name, password, avatar} = ctx.request.body
    if (email) {
        const res = await UserModel.findOne({email})
        if (!res) {
            const newUser = new UserModel({
                name,
                email,
                password: bcrypt.hashSync(password, salt),
                avatar
            })
            const res = await newUser.save()
            ctx.status = 200
            ctx.body = res
        } else {
            ctx.status = 500
            ctx.body = {
                msg: 'email is already exist'
            }
        }
    } else {
        ctx.status = 400;
        ctx.body = {
            msg: 'email is required'
        }
    }
})

module.exports = router.routes()