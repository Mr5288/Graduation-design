// 这是订单管理的路由模块

const express = require('express')
const router = express.Router()

// 导入订单管理的路由处理函数模块
const userfood_handler = require('../router_handler/userfood')

//获取食品的路由
router.get('/getusefood', userfood_handler.getUserFood)

// 根据 Id 获取食品信息的路由
router.get('/getusefood/:id', userfood_handler.getFoodById)

//获取饮品的路由
router.get('/getusedrink', userfood_handler.getUserDrink)

// 根据 Id 获取饮品信息的路由
router.get('/getusedrink/:id', userfood_handler.getDrinkById)

//购买食品的路由
router.post('/buyusefood', userfood_handler.buyUserFood)

//购买食品的路由
router.post('/buyusedrink', userfood_handler.buyUserDrink)

module.exports = router