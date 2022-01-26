const Koa = require('koa');
const Router = require('koa-router')
const koaBody = require('koa-body')

const users = require('./routes/user.routes')

const router = new Router();
const app = new Koa();

app.use(koaBody())

router.use(users)

app.use(router.routes())

module.exports = app
