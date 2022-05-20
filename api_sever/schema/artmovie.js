// 1. 导入定义验证规则的模块
const joi = require('joi')

// 2. 定义 name 和 enname 的验证规则
const movie_name = joi.string().min(1).max(30).required()
const movie_enname = joi.string().min(1).max(30).allow('').allow(null).required()
const area = joi.string().min(1).max(10).allow('').required()
const movie_type = joi.string().min(1).max(10).required()
const movie_time = joi.string().min(1).max(10).required()
const release_time = joi.string().min(1).max(60).allow('').allow(null).required()
const movie_pic = joi.string().dataUri().required()
const price = joi.string().alphanum().min(2).max(3).required()
const id = joi.number().integer().min(1).required()
const brief_introduction = joi.string().required()
    //分页数据校验规则
const pagenum = joi.number().integer().min(0).required()
const pagesize = joi.number().integer().min(1).required()
    // const password = joi
    //     .string()
    //     .pattern(/^[\S]{6,12}$/)
    //     .required()

// 定义 id,emial,phone 的验证规则
//const id = joi.number().integer().min(1).required()
//const email = joi.string().email()
//const phone = joi
// .string()
// .pattern(/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/)

// id 的校验规则


// 3. 向外共享验证规则对象

exports.add_movie_schema = {
    body: {
        movie_name,
        movie_enname,
        movie_type,
        movie_time,
        area,
        release_time,
        price,
        movie_pic,
        brief_introduction,

    },
}

// 验证规则对象 - 删除分类
exports.delete_movie_schema = {
    params: {
        id,
    },
}

// 验证规则对象 - 根据 Id 获取电影分类
exports.get_movie_schema = {
    params: {
        id,
    },
}

// 验证规则对象 - 更新分类
exports.update_movie_schema = {
        body: {
            id,
            movie_name,
            movie_type,
            movie_time,
            price,


        },
    }
    //验证电影列表
exports.list_movie_schema = {
    query: {
        pagenum,
        pagesize,
        movie_name,

    }
}