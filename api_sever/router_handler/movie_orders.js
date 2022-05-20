// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

//导入时间处理模块
const moment = require('moment')
moment().format('YYYY-MM-DD HH:mm:ss');

//根据用户名获取电影订单的处理函数

exports.getUsermovieOrder = (req, res) => {

    // 定义查询订单数据的 SQL 语句
    const sql = `select * from orders where is_delete=0 and username = '${req.use.username}' order by id desc`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取电影订单数据成功！',
            data: results,
        })
    })
}

// 根据ID删除电影订单的处理函数
exports.deletemovieOrderById = (req, res) => {

    // 定义标记删除的 SQL 语句
    const sql = `update orders set is_delete=1 where id=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除订单失败！')
        res.cc('删除订单成功！', 0)
    })
}


// 根据ID更新电影订单的处理函数
exports.updatemovieOrderById = (req, res) => {

    // 定义标记删除的 SQL 语句
    const sql = `update orders set state =2 where id= ?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('订单申请退款失败！')
        res.cc('订单申请退款成功！', 0)
    })
}

// 根据ID更新电影订单的处理函数
exports.updatemovieOrderByIds = (req, res) => {

    // 定义标记删除的 SQL 语句
    const sql = `update orders set state =3 where id= ?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('订单退款失败！')
        res.cc('订单退款成功！', 0)
    })
}

// 根据 Id 获取订单的处理函数
exports.getmovieOrderById = (req, res) => {
    // 定义根据 ID 获取电影订单数据的 SQL 语句
    const sql = 'select * from orders where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取指定订单数据失败！')
        res.send({
            status: 0,
            message: '获取指定订单数据成功！',
            data: results[0],
        })
    })
}