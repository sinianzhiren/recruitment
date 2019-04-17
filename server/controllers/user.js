const model = require('../models/User')
const UserModel = model.getModel('user')
const ChatModel = model.getModel('chat')
const md5Pwd = require('../utils/pwdSalt')

const _filter = {pwd: 0, __v: 0}

const userCreate = async (ctx, next) => {
    ctx.body = 'success'
    try {
        const res = await User.create({
            userName: 'imooc',
            age: 23
        })

        if (res) {
            ctx.body = res
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const register = async (ctx, next) => {
    try {
        const {user, pwd, type} = ctx.request.body
        const findRepeatUser = await UserModel.findOne({user: user})
        if (!findRepeatUser) {
            const saveRes = await UserModel.create({user, type, pwd: md5Pwd(pwd)})
            if (saveRes._id) {
                const {user, type, _id} = saveRes
                ctx.cookies.set('userid', _id, {signed: true, maxAge: 7200000})
                ctx.body = {code: 0, data: {user, type, _id}}
            } else {
                ctx.body = {code: 1, msg: '注册失败'}
            }
        } else {
            ctx.body = {code: 1, msg: '用户名重复'}
        }

    } catch (e) {
        console.error(e)
        next(e)
    }
}

const getUserList = async (ctx, next) => {
    const {type} = ctx.query
    try {
        const userList = await UserModel.find({type: type}, _filter)
        ctx.body = {code: 0, data: userList}
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const login = async (ctx, next) => {
    const {user, pwd} = ctx.request.body
    try {
        const userData = await UserModel.findOne({user, pwd: md5Pwd(pwd)}, _filter)
        if (!userData) {
            ctx.body = {code: 1, msg: '用户名或者密码错误'}
        } else {
            ctx.cookies.set('userid', userData._id, {signed: true, maxAge: 7200000})
            ctx.body = {code: 0, data: userData}
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const info = async (ctx, next) => {
    const userid = ctx.cookies.get('userid')

    if (!userid) {
        return ctx.body = {code: 1}
    }

    try {
        const userData = await UserModel.findById(userid, _filter)
        if (!userData) {
            return ctx.body = {code: 1, msg: '用户信息不存在'}
        }

        ctx.body = {code: 0, data: userData}
    } catch (e) {
        console.error(e)
        next(e)
    }


}

const update = async (ctx, next) => {
    const userid = ctx.cookies.get('userid')
    if (!userid) {
        return ctx.body = {code: 1}
    }

    const updateData = ctx.request.body

    try {
        const docs = await UserModel.findOneAndUpdate({'_id': userid }, updateData, _filter)
        if (docs._id) {
            return ctx.body = {code: 0, data: {user: docs.user, type: docs.type, _id: docs._id}}
        }
        return ctx.body = {code: 1, msg: '更新失败'}
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const getMsgList = async (ctx, next) => {
    try {
        const userid = ctx.cookies.get('userid')
        let users = {}
        const userList = await UserModel.find({})
        userList.forEach(item => {
            users[item._id] = {name: item.user, avatar: item.avatar}
        })
        const msgList = await ChatModel.find({'$or': [{from: userid}, {to: userid}]})
        ctx.body = {code: 0, msgs: msgList, users: users}
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const readMsg = async (ctx, next) => {
    const currentId = ctx.cookies.get('userid')
    const targetId = ctx.request.body.from
    try {
        const result = await ChatModel.updateMany(
            {from: targetId, to: currentId},
            {'$set': {read: true}},
            {multi: true})
        ctx.body = {code: 0, num: result.nModified}
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const logout = async (ctx, next) => {
    try {
        ctx.cookies.set('userid', '', {signed: false, maxAge: 0})
        ctx.cookies.set('userid.sig', '', {signed: false, maxAge: 0})
        ctx.body = {code: 0, redirectTo: '' }
    } catch (e) {
        console.error(e)
        ctx.body = {code: 1, err: e}
        next(e)
    }
}


module.exports = {
    userCreate,
    register,
    getUserList,
    login,
    info,
    update,
    getMsgList,
    readMsg,
    logout
}