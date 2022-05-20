// 这是前台用户首页获取电影列表的路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

// 获取电影管理列表的处理函数
exports.getArtMovies = (req, res) => {

    // 设置变量，接收请求参数

    let { pagenum, pagesize, movie_name } = req.query;

    // console.log(cate_id, state);
    // 根据cate_id 和 state制作SQL语句的条件
    let w = '';
    if (movie_name) {
        w += ` and movie_name like '%${movie_name}%' `;
    }

    // 分页查询数据的SQL（该SQL使用了很多变量组合）
    let sql1 = `select id,movie_name,movie_enname,movie_type,movie_time,area,release_time,price from movie where is_delete=0 ${w}
    limit ${(pagenum - 1) * pagesize}, ${pagesize}`;
    // 查询总记录数的SQL，查询条件和前面查询数据的条件 必须要一致
    let sql2 = `select count(*) total from movie where  is_delete=0 ${w}`;
    // 分别执行两条SQL（因为db查询数据库是异步方法，必须嵌套查询）
    db.query(sql1, (err, result1) => {
        if (err) throw err;
        db.query(sql2, (e, result2) => {
            if (e) throw e;
            res.send({
                status: 0,
                message: '获取电影列表数据成功',
                data: result1,
                total: result2[0].total
            });
        })
    })
}

// 新增电影管理的处理函数
exports.addArticleMovies = (req, res) => {
    const movieinfo = req.body
        // 1. 定义查重的 SQL 语句
    const sql = 'select * from movie where movie_name=? '
        // 2. 执行查重的 SQL 语句
    db.query(sql, [movieinfo.movie_name], (err, results) => {
        // 3. 判断是否执行 SQL 语句失败
        if (err) return res.cc(err)

        // 4.1 判断数据的 length
        if (results.length === 1) return res.cc('电影名被占用，请更换后重试！')

        // 4.2 length 等于 1 的三种情况
        //if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试！')
        //if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        //if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 定义插入电影管理的 SQL 语句
        const sql = `insert into movie set ?`
            // 执行插入电影管理的 SQL 语句
        db.query(sql, {
            movie_name: movieinfo.movie_name,
            movie_enname: movieinfo.movie_enname,
            movie_type: movieinfo.movie_type,
            movie_time: movieinfo.movie_time,
            area: movieinfo.area,
            release_time: movieinfo.release_time,
            price: movieinfo.price,
            brief_introduction: movieinfo.brief_introduction,
            movie_pic: movieinfo.movie_pic
        }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增电影失败！')
            res.cc('新增电影成功！', 0)
        })
    })
}

// 删除电影管理的处理函数
exports.deleteMovieById = (req, res) => {
    // 定义标记删除的 SQL 语句
    const sql = 'update movie set is_delete=1 where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除电影失败！')
        res.cc('删除电影成功！', 0)
    })
}

// 根据 Id 获取电影管理的处理函数
exports.getArtMovieById = (req, res) => {
    // 定义根据 ID 获取电影管理数据的 SQL 语句
    const sql = 'select * from movie where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取电影数据失败！')
        res.send({
            status: 0,
            message: '获取电影数据成功！',
            data: results[0],
        })
    })
}

// 根据 Id 更新电影管理的处理函数
exports.updateMovieById = (req, res) => {
    // 定义查重的 SQL 语句
    const sql = `select * from movie where Id<>? and movie_name=? `
        // 调用 db.query() 执行查重的 SQL 语句
    db.query(sql, [req.body.id, req.body.movie_name, ], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断名称和别名被占用的4种情况
        if (results.length === 1) return res.cc('用户名被占用，请更换后重试！')
            //if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
            // if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
            // if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 定义更新用户管理的 SQL 语句
        const sql = `update movie set ? where id=?`

        // 执行更新用户管理的 SQL 语句
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新电影信息失败！')
            res.cc('更新电影信息成功！', 0)
        })
    })
}