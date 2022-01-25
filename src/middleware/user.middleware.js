const crypt = require('bcryptjs')
const createResponse = require("../utils/response");
const {ERRORS} = require("../constants");
const {HTTP_CODE} = require("../constants");
const {getUserInfo} = require("../services/user.services");
const userValidator = async (ctx, next) => {
    const {email, name, password} = ctx.request.body
    if (!email || !name || !password) {
        ctx.status = HTTP_CODE.BAD_REQUEST;
        ctx.body = ERRORS.USER_MISSING_REQUIRE_WORDS;
        return
    }
    await next()
}

const userExistenceVerify = async (ctx, next) => {
    const {email, name, password} = ctx.request.body
    if (await getUserInfo({email, name, password})) {
        ctx.status = HTTP_CODE.CONFLICT
        ctx.body = ERRORS.USER_ALREADY_EXIST
        return
    }
    await next()
}

const cryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body
    const salt = crypt.genSaltSync(10);
    ctx.request.body.password = crypt.hashSync(password, salt)
    await next()
}

module.exports = {
    userValidator,
    userExistenceVerify,
    cryptPassword,
}