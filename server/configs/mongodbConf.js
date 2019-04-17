const mongoose = require('mongoose')
const mongodbConf = {
    url: 'mongodb://127.0.0.1:4499/',
    dataBaseName: 'imooc',
}

if(process.argv[2] == '--development'){
    mongodbConf.url = 'mongodb://localhost:27017/'
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