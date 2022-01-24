const createResponse = require("../utils/response");
const {getUserInfo} = require("../services/user.services");
const userValidator = async (ctx, next) => {
    const {email, name, password} = ctx.request.body
    if (!email || !name || !password) {
        ctx.status = 400;
        ctx.body = createResponse('00004', 'email、name or password is missing')
        return
    }
    await next()
}

const userExistenceVerify = async (ctx, next) => {
    const {email, name, password} = ctx.request.body
    if (await getUserInfo({email, name, password})) {
        ctx.status = 409
        ctx.body = createResponse('00002', 'user is already exist', {})
        return
    }
    await next()
}


module.exports = {
    userValidator,
    userExistenceVerify,
}