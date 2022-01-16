const Koa = require('koa');
const Router = require('koa-router')
const mongoose = require('mongoose')
const jwt = require('koa-jwt');
const keys = require('./config/keys')
const users = require('./routes/user')
const bodyParser = require('koa-bodyparser')

const mongooseURI = keys.mongooseURI

const PUBLIC_PATH_REGEXP = /^\/public/

const UNLESS_ROUTERS = [
    'login',
    'register'
]

mongoose.connect(mongooseURI).then(() => {
    console.log('\n ** mongoose connected ** \n')
}, (err) => {
    console.log('mongoose connect failed', err)
})


const router = new Router()
const app = new Koa();

router.use('/api/users', users)
app.use(bodyParser())

app.use(router.routes())

app.use(jwt({secret: keys.secret}).unless({path: [PUBLIC_PATH_REGEXP, UNLESS_ROUTERS.map(item => new RegExp(item))]}))

app.use(function (ctx, next) {
    return next().catch(error => {
        if (401 === error.status) {
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw error
        }
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is running at ${port}`)
})