const crypt = require('bcryptjs')

const {HTTP_CODE, ERRORS} = require("../constants");
const {getUserInfo} = require("../services/user.services");

const userValidator = async (ctx, next) => {
    const {email, password} = ctx.request.body
    if (!email || !password) {
        ctx.status = HTTP_CODE.BAD_REQUEST;
        ctx.body = ERRORS.USER_MISSING_REQUIRE_WORDS;
        return
    }
    await next()
}

const userExistenceVerify = async (ctx, next) => {
    const {email, name, password} = ctx.request.body
    try {
        if (await getUserInfo({email, name, password})) {
            ctx.status = HTTP_CODE.CONFLICT
            ctx.body = ERRORS.USER_ALREADY_EXIST
            return
        }
    } catch (e) {
        ctx.app.emit('error', e, ctx)
    }

    await next()
}

const cryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body
    try {
        const salt = crypt.genSaltSync(10);
        ctx.request.body.password = crypt.hashSync(String(password), salt)
    } catch (e) {
        ctx.app.emit('error', e, ctx)
    }

    await next()
}

const verifyLogin = async (ctx, next) => {
    const {email, password} = ctx.request.body
    try {
        const res = await getUserInfo({email})
        if (!res) {
            // user doesn't exist
            return ctx.app.emit('error', ERRORS.USER_NOT_EXIST, res)
        }
        const compareRes = crypt.compareSync(password, res?.password)
        if (!compareRes) {
            return ctx.app.emit('error', ERRORS.USER_LOGIN_ERROR, res)
        }
        ctx.request.body = res
        await next()
    } catch (e) {
        ctx.app.emit(e)
    }
}

module.exports = {
    userValidator,
    userExistenceVerify,
    cryptPassword,
    verifyLogin
}