const Router = require('koa-router')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/User')

const router = new Router();

router.post('/login', async ctx => {
    const {email, password} = ctx.request.body
    const res = await UserModel.findOne({
        email
    })
    if (res) {
        const passwordFromDB = res.password;
        const compareRes = bcrypt.compareSync(password, passwordFromDB)
        const token = jwt.sign({email, password}, 'test')
        console.log(compareRes);
        if (compareRes) {
            ctx.status = 200
            ctx.body = {
                msg: "login successful",
                token
            }
        }
    } else {
        ctx.status = 500
        ctx.body = {
            msg: 'The username or password is incorrect'
        }
    }
})

module.exports = router.routes()