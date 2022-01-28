const Koa = require('koa')
const koaBody = require('koa-body')
const { showError } = require('./utils/showLog')

const router = require('./routes/index')

const app = new Koa()

app.use(koaBody())

app.use(router.routes())
  .use(router.allowedMethods())

app.on('error', (err, ctx) => showError(err))

module.exports = app
