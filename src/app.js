const Koa = require('koa')
const koaBody = require('koa-body')
const path = require('path')
const koaStatic = require('koa-static')

const { showError } = require('./utils/showLog')

const router = require('./routes/index')

const app = new Koa()

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../upload'),
    keepExtensions: true
  }
}))

app
  .use(koaStatic(path.join(__dirname, '../upload')))
  .use(router.routes())
  .use(router.allowedMethods())

app.on('error', (err, ctx) => showError(err))

module.exports = app
