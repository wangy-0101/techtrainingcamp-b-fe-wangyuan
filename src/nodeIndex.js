const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const https = require('https')
const { resolve } = require('path')

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const nodeApp = require('./nodeApp')

const kPort = 8080
const router = new Router
const app = new Koa()

router.get('/nodeapp', async (ctx) => {
  ctx.body = ReactDOMServer.renderToString(
    React.createElement(nodeApp, {})
  )
})

router.get('/example_org', async (ctx) => {
  return new Promise((resolve, reject) => {
    const req = https.request('https://example.org', (res) => {
      res.pipe(ctx.res)
      res.on('end', () => {
        resolve()
      })
    })
    req.end()
  })
})

//静态资源
// router.get('/static/index.html', async (ctx) => {
//   ctx.set('Content-Type', 'text/html')
//   ctx.body = `
//   <html>
//   <body>
//   <h1>Welcome to my page!</h1>
//   </body>
//   </html>`
// })

//post
// app.use(bodyParser)
// router.post('/echo', async ctx => {
//   const { name } = ctx.request.body
//   ctx.body = `recieve ${name}`
// })


//get
// router.get('/', async ctx => {
//   ctx.body = 'hello word'
// })
app.use(router.routes()).use(router.allowedMethods())
//一个路径 + 一个method 可以写一个路由
app.listen(kPort, () => {
  console.log(`listening on ${kPort}`, 'pid:', process.pid)
})


