// 这是订单管理的路由模块

const express = require('express')
const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入订单管理的路由处理函数模块
const order_handler = require('../router_handler/order')

// 导入需要的验证规则对象
const { delete_movie_schema, } = require('../schema/artmovie')

//获取订单的路由
router.get('/getuserorder', order_handler.getUserOrder)

//获取退款的路由
router.get('/getrefund', order_handler.getRefund)

//获取订单座位的路由
router.get('/getorderbyseat/:cinema/:movie_name/:start_time', order_handler.getOrderBySeat)

// 新增订单的路由
router.post('/addorder', order_handler.addorder)

// 根据 Id 删除订单的路由
router.get('/deleteorders/:id', expressJoi(delete_movie_schema), order_handler.deleteOrderById)

module.exports = router