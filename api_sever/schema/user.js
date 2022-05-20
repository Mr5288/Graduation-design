//导入定义验证规则的包
const joi = require('joi')

// 用户名和密码的验证规则
const username = joi.string().min(1).max(15).required()
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
    // 定义 id,emial,phone 的验证规则
const id = joi.number().integer().min(1).required()
const email = joi.string().email()
const phone = joi
    .string()
    .pattern(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/)
const sex = joi.string().valid('男', '女').required()
const birthday = joi.string().max(10)
    //头像验证规则
const avatar = joi.string().dataUri().required()
    //定义注册和登录表单的验证规则对象
exports.reg_login_schema = {
        // 表示需要对 req.body 中的数据进行验证
        body: {
            //username,
            password,
        },
    }
    // dataUri() 指的是如下格式的字符串数据：
    // data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
    //const avatar = joi.string().dataUri()


// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    body: {
        id,
        sex,
        birthday,
        username,
        email,
        phone,
    },
}

// 验证规则对象 - 重置密码
exports.update_password_schema = {
    body: {
        // 使用 password 这个规则，验证 req.body.oldPwd 的值
        oldPwd: password,
        // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值         // 解读：
        // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
        // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
        // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    },
}



// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar,
    },
}