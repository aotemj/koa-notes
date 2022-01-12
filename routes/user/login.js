const Router = require('koa-router')
const UserModel = require('../../models/User')
const bcrypt = require('bcrypt')

const router = new Router();

router.post('/login', async ctx => {
    const {email, password} = ctx.request.body
    const res = await UserModel.findOne({
        email
    })
    if (res) {
        const passwordFromDB = res.password;
        const compareRes = bcrypt.compareSync(password, passwordFromDB)
        console.log(compareRes);
        if(compareRes){
            ctx.status = 200
            ctx.body = {
                msg: "login successful",
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