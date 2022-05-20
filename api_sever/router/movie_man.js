// 这是电影管理的路由模块

const express = require('express')
const router = express.Router()

// 导入电影管理的路由处理函数模块
const artMovie_handler = require('../router_handler/movie_man')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { add_movie_schema, delete_movie_schema, get_movie_schema, update_movie_schema, } = require('../schema/artmovie')

// 获取电影管理列表数据的路由
router.get('/movies', artMovie_handler.getArtMovies)

// 新增电影管理的路由
router.post('/addmovies', expressJoi(add_movie_schema), artMovie_handler.addArticleMovies)

// 根据 Id 删除电影管理的路由
router.get('/deletemovies/:id', expressJoi(delete_movie_schema), artMovie_handler.deleteMovieById)

// 根据 Id 获取电影管理的路由
router.get('/movies/:id', expressJoi(get_movie_schema), artMovie_handler.getArtMovieById)

// 根据 Id 更新电影管理的路由
router.post('/updatemovies', expressJoi(update_movie_schema), artMovie_handler.updateMovieById)


module.exports = router