const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const { getModel } = require('./models/User')
const ChatModel = getModel('chat')

const index = require('./routes/index')
const users = require('./routes/users')

io.on('connection', socket => {
    socket.on('sendMsg', data => {
      const { from, to, msg } = data
      const chatId = [from, to].sort().join('_')
        ChatModel.create({ content: msg, chatId, from, to }, (error, docs) => {
          if (error){
            return console.error(error)
          }

            io.emit('broadcast', docs)
        })

    })
})



// error handler
onerror(app)

app.keys = ['im a newer secret', 'i like turtle'];

// 连接数据库
require('./configs/mongodbConf')



// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = server
