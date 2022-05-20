// 这是食品订单管理的路由模块

const express = require('express')
const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入订单管理的路由处理函数模块
const movie_order_handler = require('../router_handler/movie_orders')

// 导入需要的验证规则对象
const { delete_movie_schema, } = require('../schema/artmovie')

//获取订单的路由
router.get('/getusermovieorder', movie_order_handler.getUsermovieOrder)

// 根据 Id 获取订单的路由
router.get('/getmovieorders/:id', expressJoi(delete_movie_schema), movie_order_handler.getmovieOrderById)

// 根据 Id 编辑订单的路由
router.post('/updatemovieorders', movie_order_handler.updatemovieOrderById)

// 根据 Id 同意退订订单的路由
router.post('/updatemovieorderss', movie_order_handler.updatemovieOrderByIds)

// 根据 Id 删除订单的路由
router.get('/deletemovieorders/:id', expressJoi(delete_movie_schema), movie_order_handler.deletemovieOrderById)



module.exports = router