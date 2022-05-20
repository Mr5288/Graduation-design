// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

//导入时间处理模块
const moment = require('moment')
moment().format('YYYY-MM-DD HH:mm:ss');

//获取食品的处理函数

exports.getUserFood = (req, res) => {

    // 定义查询食品数据的 SQL 语句

    const sql = 'select * from foods where is_delete=0 and food_sort = 1 order by id asc'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取食品数据成功！',
            data: results,
        })
    })
}

// 根据 Id 获取食品详情的处理函数
exports.getFoodById = (req, res) => {
    // 定义根据 ID 获取电影管理数据的 SQL 语句
    const sql = 'select * from foods where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取指定食品数据失败！')
        res.send({
            status: 0,
            message: '获取指定食品数据成功！',
            data: results[0],
        })
    })
}

//获取饮品的处理函数
exports.getUserDrink = (req, res) => {

    // 定义查询食品数据的 SQL 语句

    const sql = 'select * from foods where is_delete=0 and food_sort = 2 order by id asc'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取饮品数据成功！',
            data: results,
        })
    })
}

// 根据 Id 获取食品详情的处理函数
exports.getDrinkById = (req, res) => {
    // 定义根据 ID 获取电影管理数据的 SQL 语句
    const sql = 'select * from foods where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取指定饮品数据失败！')
        res.send({
            status: 0,
            message: '获取指定饮品数据成功！',
            data: results[0],
        })
    })
}

//购买食品的处理函数

exports.buyUserFood = (req, res) => {

    // 定义查询食品数据的 SQL 语句

    let sql = 'insert into food_orders set  ?';
    let sql2 = `update foods set food_stock = food_stock - ? where food_name = ? `;
    // 调用 db.query() 执行 SQL 语句
    db.query(sql, [req.body], (err, results) => {
        if (err) return res.cc(err)

        db.query(sql2, [req.body.food_num, req.body.food_name], (e) => {
            if (e) return res.cc(e)
            res.send({
                status: 0,
                message: '购买成功，更新库存成功！',
                data: results,
            })
        })

    })



}

//购买饮品的处理函数

exports.buyUserDrink = (req, res) => {

    // 定义查询食品数据的 SQL 语句

    const sql = 'insert into food_orders set '
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '购买成功！',
            data: results,
        })

    })



}