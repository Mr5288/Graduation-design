// 这是放映厅管理的路由模块

const express = require('express')
const router = express.Router()

// 导入放映厅管理的路由处理函数模块
const Gtecinma_handler = require('../router_handler/getcinma')

// 获取放映厅播放电影列表数据的路由
router.get('/getcinema/:movie_name', Gtecinma_handler.getArtcinemas)

// 获取放映厅播放电影列表数据的路由
router.get('/getcinema/:movie_name/:cinematime', Gtecinma_handler.getArtcinemas_time)

// 获取指定放映厅数据的路由
router.get('/getcinemas/:cinema_name', Gtecinma_handler.getCinemasById)

// 获取指定放映厅数据的路由
router.get('/getcinemasa', Gtecinma_handler.getCinemas)

// 根据 Id 获取电影放映的路由
router.get('/getcinemaid/:id', Gtecinma_handler.getArtCateById)



// 根据 Id 添加电影放映的路由
router.post('/addcinema', Gtecinma_handler.addAdmincinema)

// 根据 Id 更新电影放映的路由
router.post('/updatecinema', Gtecinma_handler.updateAdmincinema)

// 根据 Id 获取电影管理的路由
router.get('/getadmincinema', Gtecinma_handler.getAdminCinema)



// 根据 Id 删除电影管理的路由
router.get('/deletecinema/:id', Gtecinma_handler.deleteCinemaById)

module.exports = router