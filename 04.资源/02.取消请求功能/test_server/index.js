const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa();


const router = new KoaRouter();

app
    .use(router.allowedMethods())
    .use(router.routes());

router.get('/getData1',(ctx)=>{
    ctx.body="/getData1 success"
})

router.get('/getData2',async (ctx)=>{
    await new Promise((resolve)=>{
        setTimeout(resolve,2000)
    })
    ctx.body="/getData2 success"
})

router.get('/getData3',async (ctx)=>{
    await new Promise((resolve)=>{
        setTimeout(resolve,2000)
    })
    ctx.body="/getData3 success"
})

router.get('/getData4',async (ctx)=>{
    await new Promise((resolve)=>{
        setTimeout(resolve,10000)
    })
    ctx.body="/getData4 success"
})


app.listen("3000",(error)=>{
    if(!error){
        console.log('服务器启动成功,地址->http://localhost:3000')
    }
})