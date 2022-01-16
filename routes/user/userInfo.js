const Koa = require('koa')
const Router = require('koa-router')

const router = new Router()


router.get('infos', async (ctx) => {
    console.log(ctx);
})


module.exports = router.routes()