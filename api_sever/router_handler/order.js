// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

//导入时间处理模块
const moment = require('moment')
moment().format('YYYY-MM-DD HH:mm:ss');

//获取订单的处理函数

exports.getUserOrder = (req, res) => {
    // 设置变量，接收请求参数
    let { pagenum, pagesize, state, type, ordernum, username } = req.query;
    // console.log(cate_id, state);
    // 根据cate_id 和 state制作SQL语句的条件
    let w = '';
    if (state) {
        w += ` and state='${state}' `;
    }
    if (username) {
        w += ` and username like'%${username }%' `;
    }
    if (ordernum) {
        w += ` and id='${ordernum}' `;
    }
    if (type) {
        w += ` and cinema='${type}' `;
    }

    // 定义查询订单数据的 SQL 语句

    const sql1 = `select * from orders where is_delete=0 ${w}
    limit ${(pagenum - 1) * pagesize}, ${pagesize} `;
    let sql2 = `select count(*) total from orders 
    where  is_delete=0 ${w}`;
    // 调用 db.query() 执行 SQL 语句
    db.query(sql1, (err, result1) => {
        if (err) throw err;
        db.query(sql2, (e, result2) => {
            if (e) throw e;
            res.send({
                status: 0,
                message: '获取订单列表数据成功',
                data: result1,
                total: result2[0].total
            });
        })
    })



}


// 新增订单的处理函数
exports.addorder = (req, res) => {
    const order = req.body
        // 定义插入订单的 SQL 语句

    const sql = `insert into orders set ?`

    // 执行插入用户管理的 SQL 语句

    db.query(sql, {
        username: order.username,
        movie_name: order.movie_name,
        movie_enname: order.movie_enname,
        cinema: order.cinema,
        start_time: order.start_time,
        price: order.price,
        seat: order.seat,
        state: 0,
    }, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('购买失败！')
        res.cc('购买成功！', 0)
    })

}

// 删除订单的处理函数
exports.deleteOrderById = (req, res) => {

    // 定义标记删除的 SQL 语句
    const sql = 'update orders set is_delete=1 where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除订单失败！')
        res.cc('删除订单成功！', 0)
    })
}

// 查询订单座位的处理函数
exports.getOrderBySeat = (req, res) => {

    var data = req.body
        // 定义标记删除的 SQL 语句
    const sql = `select seat from orders where  cinema = '${req.params.cinema}' and movie_name='${req.params.movie_name}' and start_time like '%${req.params.start_time}%' `
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '查询座位数据成功！',
            data: results,
        })
    })
}

//查询退款数量
exports.getRefund = (req, res) => {
    const sql = `select count(state) as state from orders where state =2`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '查询退款数量成功',
            data: results,
        })
    })
}