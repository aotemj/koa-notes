const createResponse = require("../utils/response");
const userValidator = async (ctx, next) => {
    const {email, name, password} = ctx.request.body
    if (!email || !name || !password) {
        ctx.status = 400;
        ctx.body = createResponse('00004', 'email、name or password is missing')
        return
    }
    await next()
}

const userVerify = async (ctx, next) => {
    const {email, name, password} = ctx.request.body

}


module.exports = {
    userValidator
}