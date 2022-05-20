// 1. 导入定义验证规则的模块
const joi = require('joi')

// 2. 定义 name 和 alias 的验证规则
const username = joi.string().min(1).max(15).required().error(new Error('名称格式不正确'))
    // const password = joi
    //     .string()
    //     .pattern(/^[\S]{6,12}$/)
    //     .required()

// 定义 id,emial,phone 的验证规则
//const id = joi.number().integer().min(1).required()
const email = joi.string().email().error(new Error('邮件格式不正确'))
const phone = joi
    .string()
    .pattern(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/)

// id 的校验规则
const id = joi.number().integer().min(1).required()
const sex = joi.string().valid('男', '女').required().error(new Error('性别格式不正确'))
const birthday = joi.string().max(10)

//分页数据校验规则
const pagenum = joi.number().integer().min(0).required()
const pagesize = joi.number().integer().min(1).required()
    // 3. 向外共享验证规则对象

exports.add_cate_schema = {
    body: {
        username,
        email,
        phone,
        sex,
        birthday,
    },
}

// 验证规则对象 - 删除分类
exports.delete_cate_schema = {
    params: {
        id,
    },
}

// 验证规则对象 - 根据 Id 获取文章分类
exports.get_cate_schema = {
    params: {
        id,
    },
}

// 验证规则对象 - 更新分类
exports.update_cate_schema = {
        body: {
            id,
            username,
            email,
            phone,
            sex,
            birthday,

        },
    }
    //验证规则对象，分页
exports.list_article_schema = {
    query: {
        pagenum,
        pagesize,
        sex,
        username,

    }
}