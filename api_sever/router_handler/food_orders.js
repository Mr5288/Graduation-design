// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

//导入时间处理模块
const moment = require('moment')
moment().format('YYYY-MM-DD HH:mm:ss');

//获取食品订单的处理函数

exports.getUserFoodOrder = (req, res) => {

    // 定义查询订单数据的 SQL 语句


    const sql = `select * from food_orders where is_delete=0 and username = '${req.user.username}' order by id asc`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取食品订单数据成功！',
            data: results,
        })

    })



}


// 新增订单的处理函数
exports.addFoodorder = (req, res) => {

}


// 删除电影管理的处理函数
exports.deleteFoodOrderById = (req, res) => {

    // 定义标记删除的 SQL 语句
    const sql = `update food_orders set is_delete=1 where id=?`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除订单失败！')
        res.cc('删除订单成功！', 0)
    })
}