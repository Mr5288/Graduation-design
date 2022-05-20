// 这是餐饮管理的路由模块

const express = require('express')
const router = express.Router()

// 导入产品管理的路由处理函数模块
const food_handler = require('../router_handler/food')

// 获取产品管理列表数据的路由
router.get('/getfood', food_handler.getArtcinemas)

// 添加产品管理列表数据的路由
router.post('/addfood', food_handler.addFoods)

// 根据ID获取产品管理列表数据的路由
router.get('/getfood/:id', food_handler.getFoodById)

// 根据ID编辑产品管理列表数据的路由
router.post('/updatefood', food_handler.updateFoodById)

// 根据ID删除产品管理列表数据的路由
router.get('/deletefood/:id', food_handler.deletefoodById)


module.exports = router