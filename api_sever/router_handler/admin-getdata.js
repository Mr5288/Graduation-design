// 导入数据库操作模块
const db = require('../db/index')
    //获取管理员主页数据的处理函数
exports.getIndexInfo = (req, res) => {
    const sql = `SELECT COUNT(id) as usernum from ev_users WHERE is_delete = 0`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取主页数据失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取主页数据信息成功！',
            data: results[0],
        })
    })
}

exports.getOrderInfo = (req, res) => {
    const sql = `SELECT SUM(price) as sumprice ,COUNT(id) as orders from orders WHERE is_delete = 0`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)

        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取主页数据失败！')

        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取主页数据信息成功！',
            data: results[0],
        })
    })
}

// 获取产品数据列表的处理函数
exports.getIndexsale = (req, res) => {

    const sql = 'SELECT movie_name ,SUM(price) as price  from orders GROUP BY movie_name order by price DESC LIMIT 3'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取销售数据成功！',
            data: results,
        })
    })
}

// 获取产品数据列表的处理函数
exports.getIndexsale_date = (req, res) => {

    const sql = `SELECT  date(creat_time) AS date,COUNT(id) as num, sum(price) as price from orders WHERE YEARWEEK(date_format(creat_time,'%Y-%m-%d'),1) = YEARWEEK(now(),1)-1 GROUP BY date`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取销售数据成功！',
            data: results,
        })
    })
}