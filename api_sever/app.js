// 导入 express 模块
const express = require('express')

// 创建 express 的服务器实例
const app = express()

// write your code here...
const joi = require('@hapi/joi')

// 导入 cors 中间件
const cors = require('cors')

// 将 cors 注册为全局中间件
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))

// 一定要在路由之前导入响应数据的中间件
app.use(function(req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function(err, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 导入配置文件
const config = require('./config')

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))


// 导入并使用用户路由模块
const userRouter = require('./router/user')

app.use('/api', userRouter)

// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')

// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)

// 导入并使用获取管理员主页数据路由模块
const getDataRouter = require('./router/admin-getdata')

app.use('/my/getdata', getDataRouter)

// 导入并使用管理员用户管理路由模块
const artCateRouter = require('./router/artcate')

// 为用户管理的路由挂载统一的访问前缀 /my/article
app.use('/my/article', artCateRouter)

//导入并使用管理员电影管理路由模块
const artMovieRouter = require('./router/movie_man')

// 为电影管理的路由挂载统一的访问前缀 /my/movieman
app.use('/my/movieman', artMovieRouter)

//导入并使用管理员订单管理路由模块
const orderRouter = require('./router/order')

// 为订单的路由挂载统一的访问前缀 /my/order
app.use('/my/order', orderRouter)

//导入并使用管理员放映厅管理路由模块
const cinmarRouter = require('./router/getcinma')

// 为放映厅的路由挂载统一的访问前缀 /my/order
app.use('/my/cinma', cinmarRouter)

//导入并使用管理员餐饮管理路由模块
const foodRouter = require('./router/food')

// 为餐饮的路由挂载统一的访问前缀 /my/order
app.use('/my/food', foodRouter)

//导入并使用用户主页电影路由模块
const getmovieRouter = require('./router/getmovie')

// 为电影的路由挂载统一的访问前缀 /my
app.use('/my/getmovie', getmovieRouter)

//导入并使用用户食品订单管理路由模块
const getfoodorderRouter = require('./router/food_orders')

//为食品订单挂载统一访问前缀/my/getfoodorder
app.use('/my/orders', getfoodorderRouter)

//导入并使用用电影订单管理路由模块
const getmovieorderRouter = require('./router/movie_orders')

//为电影订单挂载统一访问前缀/my/getfoodorder
app.use('/my/orders', getmovieorderRouter)

//导入并使用用户食品订单管理路由模块
const getfoodRouter = require('./router/userfood')

//为食品订单挂载统一访问前缀/my/getfoodorder
app.use('/my/foods', getfoodRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
        // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
        // 未知的错误
    res.cc(err)
})


// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function() { 
    console.log('api server running at http://127.0.0.1:3007')
})