const fs = require('fs')
const Router = require('koa-router')

const router = new Router()

const filePaths = fs.readdirSync(__dirname)
filePaths.forEach(filePath => {
  if (/\w+\.routes\.js$/.test(filePath)) {
    const file = require(`./${filePath}`)
    router.use(file)
  }
})

module.exports = router.routes()
