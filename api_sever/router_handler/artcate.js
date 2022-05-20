// 这是路由处理函数模块

// 导入数据库操作模块
const db = require('../db/index')

// 获取用户管理列表的处理函数
exports.getArtCates = (req, res) => {

    // 设置变量，接收请求参数
    let { pagenum, pagesize, sex, username } = req.query;
    // console.log(cate_id, state);
    // 根据cate_id 和 state制作SQL语句的条件
    let w = '';
    if (sex) {
        w += ` and sex='${sex}' `;
    }
    if (username) {
        w += ` and username='${username }' `;
    }

    // 分页查询数据的SQL（该SQL用到了连表查询，并且使用了很多变量组合）
    let sql1 = `select id, username, sex, birthday, email, phone,creat_time from ev_users
    where is_delete=0 ${w}
    limit ${(pagenum - 1) * pagesize}, ${pagesize}`;
    // 查询总记录数的SQL，查询条件和前面查询数据的条件 必须要一致
    let sql2 = `select count(*) total from ev_users 
    where  is_delete=0 ${w}`;
    // 分别执行两条SQL（因为db查询数据库是异步方法，必须嵌套查询）
    db.query(sql1, (err, result1) => {
        if (err) throw err;
        db.query(sql2, (e, result2) => {
            if (e) throw e;
            res.send({
                status: 0,
                message: '获取用户列表数据成功',
                data: result1,
                total: result2[0].total
            });
        })
    })


    // // 定义查询用户数据的 SQL 语句
    // const sql = 'select * from ev_users where  is_delete = 0  '
    //     // 调用 db.query() 执行 SQL 语句
    // db.query(sql, [req.query.sex || null, (req.query.pagenum - 1) * req.query.pagesize, req.query.pagesize], (err, results) => {
    //     if (err) return res.cc(err)
    //     res.send({
    //         status: 0,
    //         message: '获取用户数据成功！',
    //         data: results,

    //     })
    // })
}

// 新增用户管理的处理函数
exports.addArticleCates = (req, res) => {
    // 1. 定义查重的 SQL 语句
    const sql = 'select * from ev_users where username=? '
        // 2. 执行查重的 SQL 语句
    db.query(sql, [req.body.username], (err, results) => {
        // 3. 判断是否执行 SQL 语句失败
        if (err) return res.cc(err)

        // 4.1 判断数据的 length
        if (results.length === 1) return res.cc('用户名被占用，请更换后重试！')

        // 4.2 length 等于 1 的三种情况
        //if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试！')
        //if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        //if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 定义插入用户管理的 SQL 语句
        const sql = `insert into ev_users set ?`
            // 执行插入用户管理的 SQL 语句
        db.query(sql, { username: req.body.username, sex: req.body.sex, birthday: req.body.birthday, email: req.body.email, phone: req.body.phone }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增用户失败！')
            res.cc('新增用户成功！', 0)
        })
    })
}

// 删除用户管理的处理函数
exports.deleteCateById = (req, res) => {
    // 定义标记删除的 SQL 语句
    const sql = 'update ev_users set is_delete=1 where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除用户失败！')
        res.cc('删除用户成功！', 0)
    })
}

// 根据 Id 获取用户管理的处理函数
exports.getArtCateById = (req, res) => {
    // 定义根据 ID 获取用户管理数据的 SQL 语句
    const sql = 'select * from ev_users where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取用户数据失败！')
        res.send({
            status: 0,
            message: '获取用户数据成功！',
            data: results[0],
        })
    })
}

// 根据 Id 更新用户管理的处理函数
exports.updateCateById = (req, res) => {
    // 定义查重的 SQL 语句
    const sql = `select * from ev_users where Id<>? and username=? `
        // 调用 db.query() 执行查重的 SQL 语句
    db.query(sql, [req.body.id, req.body.username, ], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断名称和别名被占用的4种情况
        if (results.length === 1) return res.cc('用户名被占用，请更换后重试！')
            //if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
            // if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
            // if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 定义更新用户管理的 SQL 语句
        const sql = `update ev_users set ? where id=?`

        // 执行更新用户管理的 SQL 语句
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新用户信息失败！')
            res.cc('更新用户信息成功！', 0)
        })
    })
}

//分页处理函数 已作废
exports.listArticle = async(req, res) => {
    const sql = `select COUNT(*) as total from ev_users where is_delete = 0`

    db.query(sql, [req.query.sex || null, (req.query.pagenum - 1) * req.query.pagesize, req.query.pagesize])
    if (err) return res.cc(err)

    res.send({
        status: 0,
        msg: '获取文章列表成功',
        data: results,
        total: data.length,
    })

}