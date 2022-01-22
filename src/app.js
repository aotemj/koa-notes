const Koa = require('koa');
const Router = require('koa-router')
const mongoose = require('mongoose')
const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken')
const keys = require('./config/keys')
const users = require('./routes/user.routes')
const bodyParser = require('koa-bodyparser')
const unprotectedRoutes = require("./config/unprotectedRoutes");

// const Auth = require('./middleware/Auth')

const router = new Router()
const app = new Koa();

// app.use(Auth)
app.use(bodyParser())

// app.use(function (ctx, next) {
//     return next().catch(error => {
//         if (401 === error.status) {
//             ctx.body = 'Protected resource, use Authorization header to get access\n';
//         } else {
//             throw error
//         }
//     })
// })

// app.use(koaJwt({secret: keys.secret}).unless({path: unprotectedRoutes}))

router.use(users)

app.use(router.routes())

module.exports = app
