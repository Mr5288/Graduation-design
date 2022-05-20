const express = require('express')
const router = express.Router()

// 导入电影管理的路由处理函数模块
const getmovie_handler = require('../router_handler/getmovie')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { get_movie_schema } = require('../schema/artmovie')

// 获取热门影人列表数据的路由
router.get('/getmovies', getmovie_handler.getMovies)

// 获取电影主页列表数据的路由
router.get('/getmoviesindex', getmovie_handler.getMoviesIndex)

// 获取TOP列表数据的路由
router.get('/getmoviestop', getmovie_handler.getMoviesTop)

// 获取经典热播列表数据的路由
router.get('/getmovieshotmovie', getmovie_handler.getMoviesHotMovie)

// 获取热门影人列表数据的路由
router.get('/getmovieshot', getmovie_handler.getMoviesHot)

// 根据 Id 获取电影管理的路由
router.get('/movies/:id', expressJoi(get_movie_schema), getmovie_handler.getMovieById)

// 根据 Id 获取热门影人的路由
router.get('/actors/:id', expressJoi(get_movie_schema), getmovie_handler.getActorsById)

// 根据 Name 获取电影管理的路由
router.get('/search_movies/:movie_name', getmovie_handler.getMovieByName)

// 根据 Type 获取电影管理的路由
router.get('/select_movies/:movie_type', getmovie_handler.getMovieByType)

module.exports = router