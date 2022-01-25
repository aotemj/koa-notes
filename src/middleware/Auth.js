const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const unprotectedRoutes = require("../config/unprotectedRoutes");
const {HTTP_CODE} = require("../constants");

function Auth(ctx, next) {
    const {request: {header: {authorization}}, url} = ctx
    unprotectedRoutes.forEach(async item => {
        console.log('item->', item);
        if (url.match(item)) {
            next()
        } else {
            let res = jwt.verify(authorization.split(' ')[1], keys.secret)
            if (res) {
                ctx.state.info = res
            } else {
                ctx.throw(HTTP_CODE.UN_AUTHORIZED, 'token error')
            }
            await next();
        }
    })
}

module.exports = Auth