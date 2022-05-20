/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
//导入数据库操作模块：
const db = require('../db/index')
    //导入bcryptjs包
const bcrypt = require('bcryptjs');
// 导入包来生成 Token 字符串
const jwt = require('jsonwebtoken')
    // 导入全局配置文件
const config = require('../config')

const e = require('express');
// 注册用户的处理函数
exports.regUser = (req, res) => { 
    // 接收表单数据
    const userinfo = req.body
    console.log(userinfo);
    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password) { 
        return res.send({ status: 1, message: '用户名或密码不能为空！' })
    }
    //定义查询sql语句
    const sql = 'select * from ev_users where username=?'
    db.query(sql, [userinfo.username], function(err, results) {
            // 执行 SQL 语句失败

            if (err) {
                // return res.send({ status: 1, message: err.message })
                return res.cc(err)
            } // 用户名被占用

            if (results.length > 0) {
                //return res.send({ status: 1, message: '用户名已存在，换一个吧！' })
                return res.cc('用户名已存在，换一个吧！')
            }
            //对密码进行加密
            userinfo.password = bcrypt.hashSync(userinfo.password, 10)
                // TODO: 用户名可用，继续后续流程...
            const sql = 'insert into ev_users set ?'
                //调用 db.query() 执行 SQL 语句，插入新用户：
            db.query(sql, { username: userinfo.username, password: userinfo.password, }, function(err, results) { 
                // 执行 SQL 语句失败

                // if (err) return res.send({ status: 1, message: err.message })
                if (err) return res.cc(err)
                    // SQL 语句执行成功，但影响行数不为 1
                    // if (results.affectedRows !== 1) {
                    // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                    // } 
                if (results.affectedRows !== 1) {
                    return res.cc('注册用户失败，请稍后再试！')
                }
                // 注册成功


                res.cc('注册成功！', 0)
            })
        })
        //定义插入sql语句


}

// 登录的处理函数
exports.user_login = (req, res) => {
    //接收表单数据
    const userinfo = req.body
        //定义sql语句
    const sql = 'select * from ev_users where username=?'
        //执行sql语句查询用户  
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户名不存在！')
            // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码错误！')
        }
        // TODO：登录成功，生成 Token 字符串
        const user = {...results[0], password: '', user_pic: '' }
            // 对用户信息进行加密生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                expiresIn: config.expiresIn // token 有效期为 10 个小时

            })
            //调用res.send将token返回给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,

        })

    })

}

// 登录的处理函数
exports.admin_login = (req, res) => {
    //接收表单数据
    const userinfo = req.body
        //定义sql语句
    const sql = 'select * from ev_users where username=? and id<3'
        //执行sql语句查询用户  
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户名不存在！')
            // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('登录失败！')
        }



        // TODO：登录成功，生成 Token 字符串
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值

        const user = {...results[0], password: '', user_pic: '' }
            // 对用户信息进行加密生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
                expiresIn: config.expiresIn // token 有效期为 10 个小时

            })
            //调用res.send将token返回给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,

        })

    })

}