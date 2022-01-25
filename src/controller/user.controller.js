const crypt = require("bcryptjs")
const createResponse = require("../utils/response");
const {pick} = require("ramda");
const {ERRORS} = require("../constants");
const {HTTP_CODE} = require("../constants");
const {MSG_CODE} = require("../constants");
const {createUser, getUserInfo} = require('../services/user.services')


class UserController {
    async login(ctx) {
        const {email, password} = ctx.request.body
        try {
            const res = await getUserInfo({email})
            if (res) { // user exist
                const compareRes = crypt.compareSync(password, res?.password)
                if (compareRes) {
                    ctx.status = HTTP_CODE.SUCCESS
                    ctx.body = createResponse(MSG_CODE.CODE0, 'login successful', pick(['email', 'name', 'isAdmin'], res))
                } else {
                    ctx.status = HTTP_CODE.SUCCESS
                    ctx.body = ERRORS.USER_LOGIN_ERROR
                }
            } else {// user doesn't exist
                ctx.status = HTTP_CODE.SUCCESS
                ctx.body = ERRORS.USER_NOT_EXIST
            }
        } catch (e) {
            ctx.app.emit(e)
        }
    }

    async register(ctx) {
        const {email, name, password} = ctx.request.body
        const res = await createUser({
            email,
            name,
            password
        })
        if (res) {
            const {email, name} = res
            ctx.body = createResponse(MSG_CODE.CODE0, 'register successful', {
                email, name
            })
        } else {
            ctx.body = ERRORS.USER_ALREADY_EXIST
        }
    }

    async info(ctx) {
        const {email, name, password} = ctx.request.query
        const res = await getUserInfo({email, name, password})
        if (res) {
            ctx.status = HTTP_CODE.SUCCESS
            ctx.body = createResponse(MSG_CODE.CODE0, 'get info successful', res)
        } else {
            ctx.status = HTTP_CODE.NOT_FOUND
            ctx.body = ERRORS.USER_NOT_EXIST
        }
    }
}

const userController = new UserController()

module.exports = userController