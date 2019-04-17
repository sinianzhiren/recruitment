const mongoose = require('mongoose')
const mongodbConf = {
    url: 'mongodb://localhost:27017/',
    dataBaseName: 'imooc',
}

mongoose.connect(
    mongodbConf.url + mongodbConf.dataBaseName,
    {
        useNewUrlParser: true
    })

mongoose.connection.on('connected', () => {
    console.log('数据库连接成功')
})

mongoose.set('useCreateIndex', true)

module.exports = mongoose