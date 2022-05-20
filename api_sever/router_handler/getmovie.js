// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

// 获取电影管理列表的处理函数
exports.getMovies = (req, res) => {
    // 定义查询电影数据的 SQL 语句
    const sql = 'select *  from movie limit 10,10 '
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

// 获取电影列表的处理函数
exports.getMoviesIndex = (req, res) => {
    // 定义查询电影数据的 SQL 语句
    const sql = 'select *  from movie  '
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取电影列表电影数据成功！',
            data: results,
        })
    })
}

// 获取电影TOP列表的处理函数
exports.getMoviesTop = (req, res) => {
    // 定义查询电影数据的 SQL 语句
    const sql = 'select *  from movie  limit 0,10'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取电影列表电影数据成功！',
            data: results,
        })
    })
}

// 获取电影Hot列表的处理函数
exports.getMoviesHotMovie = (req, res) => {
    // 定义查询电影数据的 SQL 语句
    const sql = 'select *  from movie  limit 20,8'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取经典热播数据成功！',
            data: results,
        })
    })
}

// 获取电影Hot列表的处理函数
exports.getMoviesHot = (req, res) => {
    // 定义查询电影数据的 SQL 语句
    const sql = 'select *  from actors  limit 0,10'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取热门影人数据成功！',
            data: results,
        })
    })
}

// 根据 Id 获取电影管理的处理函数
exports.getMovieById = (req, res) => {
    // 定义根据 ID 获取电影管理数据的 SQL 语句
    const sql = 'select * from movie where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取指定电影数据失败！')
        res.send({
            status: 0,
            message: '获取指定电影数据成功！',
            data: results[0],
        })
    })
}

// 根据 Id 获取电影管理的处理函数
exports.getActorsById = (req, res) => {
    // 定义根据 ID 获取电影管理数据的 SQL 语句
    const sql = 'select * from actors where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取指定影人数据失败！')
        res.send({
            status: 0,
            message: '获取指定影人数据成功！',
            data: results[0],
        })
    })
}

// 根据 Name 获取电影管理的处理函数
exports.getMovieByName = (req, res) => {
    // 定义查询电影数据的 SQL 语句
    const sql = `select *  from movie  where movie_name like '%${req.params.movie_name}%'`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取电影列表电影数据成功！',
            data: results,
        })
    })
}

// 根据 Type 获取电影管理的处理函数
exports.getMovieByType = (req, res) => {
    // 定义查询电影数据的 SQL 语句
    const sql = `select *  from movie  where movie_type like '%${req.params.movie_type}%'`
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取电影列表电影数据成功！',
            data: results,
        })
    })
}