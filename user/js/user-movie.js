$(function() {
    initMovieList()
    initTopList()
    initHotMovieList()
    initHotList()


    // 获取首页电影的列表
    function initMovieList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/getmovie/getmovies',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },

            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取电影信息失败！')
                }
                var htmlStr = template('tpl-movies', res)
                    // var htmlStr2 = template('tpl-top', res)
                $('#movies-list').html(htmlStr)
                    // $('#top-list').html(htmlStr2)
                    // renderMoie_pic(res.data)
            }
        })
    }

    // 获取TOP电影的列表
    function initTopList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/getmovie/getmoviestop',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },

            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取电影信息失败！')
                }
                var htmlStr = template('tpl-top', res)
                    // var htmlStr2 = template('tpl-top', res)
                $('#top-list').html(htmlStr)
                    // $('#top-list').html(htmlStr2)
                    // renderMoie_pic(res.data)
            }
        })
    }

    // 获取经典热播电影的列表
    function initHotMovieList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/getmovie/getmovieshotmovie',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },

            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取热门影人失败！')
                }
                var htmlStr = template('tpl-movie', res)
                    // var htmlStr2 = template('tpl-top', res)
                $('#hot-movie-list').html(htmlStr)
                    // $('#top-list').html(htmlStr2)
                    // renderMoie_pic(res.data)
            }
        })
    }

    // 获取HOST电影的列表
    function initHotList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/getmovie/getmovieshot',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },

            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取热门影人失败！')
                }
                var htmlStr = template('tpl-hot', res)
                    // var htmlStr2 = template('tpl-top', res)
                $('#hot-list').html(htmlStr)
                    // $('#top-list').html(htmlStr2)
                    // renderMoie_pic(res.data)
            }
        })
    }


})