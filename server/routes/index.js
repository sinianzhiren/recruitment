const router = require('koa-router')()
const user = require('../controllers/user')


router.get('/', async (ctx, next) => {
    await ctx.render('index.html')
})

// router.get('/string', async (ctx, next) => {
//     ctx.body = 'koa2 string'
// })
//
// router.get('/json', async (ctx, next) => {
//     ctx.body = {
//         title: 'koa2 json'
//     }
// })

router.get('/create', user.userCreate)

router.post('/user/register', user.register)

router.post('/user/login', user.login)

router.post('/user/update', user.update)

router.get('/user/info', user.info)

router.get('/user/list', user.getUserList)

router.get('/user/getmsglist', user.getMsgList)


router.post('/user/read', user.readMsg)

router.get('/user/logout', user.logout)




module.exports = router
