const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const unprotectedRoutes = require("../config/unprotectedRoutes");

function Auth(ctx, next) {
    const {request: {header: {authorization}}, url} = ctx
    unprotectedRoutes.forEach(async item => {
        console.log('item->', item);
        if (url.match(item)) {
            next()
        } else {
            let res = jwt.verify(authorization.split(' ')[1], keys.secret)
            if (res) {
                ctx.state.infos = res
            } else {
                ctx.throw(401, 'token error')
            }
            await next();
        }
    })
}

module.exports = Auth