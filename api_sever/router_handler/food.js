//导入数据库操作模块：
const db = require('../db/index')

// 获取产品数据列表的处理函数
exports.getArtcinemas = (req, res) => {

    const sql = 'select *  from foods where is_delete = 0'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取餐饮数据成功！',
            data: results,
        })
    })
}

// 新增产品数据的处理函数
exports.addFoods = (req, res) => {
    // 1. 定义查重的 SQL 语句
    const sql = 'select * from foods where food_name=? '
        // 2. 执行查重的 SQL 语句
    db.query(sql, [req.body.food_name], (err, results) => {
        // 3. 判断是否执行 SQL 语句失败
        if (err) return res.cc(err)

        // 4.1 判断数据的 length
        if (results.length === 1) return res.cc('产品名被占用，请更换后重试！')

        // 定义插入产品数据的 SQL 语句
        const sql = `insert into foods set ?`
            // 执行插入产品数据的 SQL 语句
        db.query(sql, { food_name: req.body.food_name, food_stock: req.body.food_stock, food_price: req.body.food_price, food_pic: req.body.food_pic }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增产品失败！')
            res.cc('新增产品成功！', 0)
        })
    })
}

// 删除产品数据的处理函数
exports.deletefoodById = (req, res) => {
    // 定义标记删除的 SQL 语句
    const sql = 'update foods set is_delete=1 where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除产品失败！')
        res.cc('删除产品成功！', 0)
    })
}

// 根据 Id 获取产品数据的处理函数
exports.getFoodById = (req, res) => {
    // 定义根据 ID 获取产品数据数据的 SQL 语句
    const sql = 'select * from foods where id=?'
        // 调用 db.query() 执行 SQL 语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取产品数据失败！')
        res.send({
            status: 0,
            message: '获取产品数据成功！',
            data: results[0],
        })
    })
}

// 根据 Id 更新产品数据的处理函数
exports.updateFoodById = (req, res) => {
    // 定义查重的 SQL 语句
    const sql = `select * from foods where Id<>? and food_name=? `
        // 调用 db.query() 执行查重的 SQL 语句
    db.query(sql, [req.body.id, req.body.food_name, ], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断名称和别名被占用的4种情况
        if (results.length === 1) return res.cc('产品名被占用，请更换后重试！')
            //if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
            // if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
            // if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 定义更新产品数据的 SQL 语句
        const sql = `update foods set ? where id=?`

        // 执行更新产品数据的 SQL 语句
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新产品信息失败！')
            res.cc('更新产品信息成功！', 0)
        })
    })
}