//导入数据库操作模块：
const db = require('../db/index')

// 根据影厅名查询相关电影理列表的处理函数
exports.getArtcinemas = (req, res) => {
    let sql1 = `call cinema_time()`;
    let sql2 = `SELECT a.movie_name, a.id, star_time,end_time,lan_ver,cinema_name,price 
FROM cinema a , movie b
WHERE a.movie_name = b.movie_name AND a.movie_name='${req.params.movie_name}' and a.is_delete = 0 order by star_time asc`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql1, (err) => {
        if (err) throw err;
        db.query(sql2, (e, results) => {
            if (e) throw e;
            res.send({
                status: 0,
                message: '获取放映厅数据成功！',
                data: results,
            })

        })

    })
}

// 根据时间查询相关电影理列表的处理函数
exports.getArtcinemas_time = (req, res) => {
    let sql1 = `call cinema_time()`;
    let sql2 = `SELECT a.movie_name, a.id, star_time,end_time,lan_ver,cinema_name,price 
                FROM cinema a , movie b
                WHERE a.movie_name = b.movie_name AND a.movie_name='${req.params.movie_name}' AND a.state = 0 AND star_time like '%${req.params.cinematime}%'
                order by star_time asc`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql1, (err) => {
        if (err) throw err; //如有错误进行报错
        db.query(sql2, (e, results) => {
            if (e) throw e;
            res.send({
                status: 0,
                message: '获取放映厅数据成功！',
                data: results,
            })

        })

    })
}

// 根据 Id 获取影厅管理的处理函数
exports.getArtCateById = (req, res) => {
    // 定义根据 ID 获取影厅管理数据的 SQL 语句
    const sql = 'select * from cinema where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取指定影厅数据失败！')
        res.send({
            status: 0,
            message: '获取指定影厅数据成功！',
            data: results[0],
        })
    })
}

// 根据 影厅名 获取影厅管理的处理函数
exports.getCinemasById = (req, res) => {
    // 定义根据 ID 获取影厅管理数据的 SQL 语句
    const sql = `select * from cinema where cinema_name = '${req.params.cinema_name}'`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取指定影厅数据失败！')
        res.send({
            status: 0,
            message: '获取指定影厅数据成功！',
            data: results[0],
        })
    })
}

// 用户首页获取电影管理列表的处理函数
exports.getCinemas = (req, res) => {
    // 定义查询电影数据的 SQL 语句
    const sql = 'select *  from cinema limit 10 '
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取用户首页电影数据成功！',
            data: results,
        })
    })
}

// 根据 添加放映数据 处理函数
exports.addAdmincinema = (req, res) => {

    // 定义插入放映数据的 SQL 语句
    const sql = `insert into cinema set ? `

    // 执行插入放映数据的 SQL 语句
    db.query(sql, [req.body], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加电影放映信息失败！')
        res.cc('添加电影放映信息成功！', 0)
    })

}

// 根据 更新放映数据 处理函数
exports.updateAdmincinema = (req, res) => {

    // 定义插入放映数据的 SQL 语句
    const sql = `update cinema  set ? where id=?`

    // 执行插入放映数据的 SQL 语句
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新电影放映信息失败！')
        res.cc('更新电影放映信息成功！', 0)
    })

}

//管理员放映厅数据
exports.getAdminCinema = (req, res) => {
    // 设置变量，接收请求参数
    let { pagenum, pagesize } = req.query;
    // 定义查询订单数据的 SQL 语句

    const sql1 = `select * from cinema where is_delete=0 
    limit ${(pagenum - 1) * pagesize}, ${pagesize} `;
    let sql2 = `select count(*) total from cinema 
    where  is_delete=0 `;
    // 调用 db.query() 执行 SQL 语句
    db.query(sql1, (err, result1) => {
        if (err) throw err;
        db.query(sql2, (e, result2) => {
            if (e) throw e;
            res.send({
                status: 0,
                message: '获取放映列表数据成功',
                data: result1,
                total: result2[0].total
            });
        })
    })



}

// 删除放映数据的处理函数
exports.deleteCinemaById = (req, res) => {
    // 定义标记删除的 SQL 语句
    const sql = 'update cinema set is_delete=1 where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除放映数据失败！')
        res.cc('删除放映数据成功！', 0)
    })
}