const userValidator = async (ctx, next) => {
    const {email, name, password} = ctx.request.body
    if (!email || !name || !password) {
        ctx.status = 400;
        ctx.body = {
            code: '0001',
            msg: 'email、name or password is missing',
            data: {}
        }
        return
    }
    await next()
}

const userVerify = async (ctx, next) => {
    const {} = ctx.request.body
}


module.exports = {
    userValidator
}