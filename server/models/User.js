const mongoose = require('mongoose')

const models = {
    user: {
        user: {
            type: String,
            require: true,
            unique: true
        },
        pwd: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true
        },
        avatar: { type: String }, // 头像
        // 个人简介
        desc: { type: String },
        // 头衔
        title: { type: String },
        // 如果 boss 多了下面两个
        company: { type: String },
        money: { type: String }
    },
    chat: {
        chatId: {
          type: String,
          required: true
        },
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true
        },
        read: { // 只对to有效果
          type: Boolean,
          default: false
        },
        content: {
            type: String,
            required: true,
            default: ''
        },
        createTime: {
            type: Number,
            default: new Date().getTime()
        }
    }
}

for (let m in models){
    mongoose.model(m, new mongoose.Schema(models[m]))
}


module.exports= {
    getModel: (name) => mongoose.model(name)
}