const Koa = require("koa")
const Router = require("koa-router")

const router = new Router();
const app = new Koa()

router.get("/",async ctx=>{
    ctx.body= {
        msg: "hello koa"
    }
})
app
    .use(router.routes())
    .use(router.allowedMethods())

const port= process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})