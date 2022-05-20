// 导入 express
const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入用户信息的处理函数模块
const getdata_handler = require('../router_handler/admin-getdata')

//获取管理员主页数据
router.get('/getindex', getdata_handler.getIndexInfo)
router.get('/getindexorder', getdata_handler.getOrderInfo)
router.get('/getindexsale', getdata_handler.getIndexsale)
router.get('/getindexsale-date', getdata_handler.getIndexsale_date)

module.exports = router