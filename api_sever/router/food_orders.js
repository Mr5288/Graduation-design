// 这是食品订单管理的路由模块

const express = require('express')
const router = express.Router()

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入订单管理的路由处理函数模块
const food_order_handler = require('../router_handler/food_orders')

// 导入需要的验证规则对象
const { delete_movie_schema, } = require('../schema/artmovie')

//获取订单的路由
router.get('/getuserfoodorder', food_order_handler.getUserFoodOrder)

// 新增订单的路由
router.post('/addfoodorder', food_order_handler.addFoodorder)

// 根据 Id 删除电影管理的路由
router.get('/deletefoodorders/:id', expressJoi(delete_movie_schema), food_order_handler.deleteFoodOrderById)

module.exports = router