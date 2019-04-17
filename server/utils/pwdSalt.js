const utility = require('utility')

function md5Pwd(pwd) {
    const salt = 'adugfkd#$@!78l%&^*)(~~'
    const saltPwd = utility.md5(utility.md5(pwd + salt))

    return saltPwd
}

module.exports = md5Pwd
