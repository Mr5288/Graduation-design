$(function() {

    getmovieinfo()
    var layer = layui.layer
        // 获取电影的基本信息

})

function getmovieinfo() {
    var id = location.search.substr(1)
        //var movieid = parseInt(url)
        // 发起请求获取对应分类的数据
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:3007/my/getmovie/movies/' + id,
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {

            renderMoie_pic(res.data)
        }

        //renderMoie_pic(res.data)

    })
}

function renderMoie_pic(movie) {
    // 1. 获取电影相关信息
    var movie_name = movie.movie_name
    var movie_enname = movie.movie_enname
    var movie_type = movie.movie_type //.substring(0, 10)
    var movie_time = movie.movie_time
    var area = movie.area
    var release_time = movie.release_time
    var brief_introduction = movie.brief_introduction
        // 1.1设置相关信息
    $('#movie_name').html(movie_name)
    $('#movie_enname').html(movie_enname)
    $('#movie_type').html(movie_type)
    $('movie_time1').html(movie_time)
    $('#area').html(area)
    $('#release_time').html(release_time)
    $('#brief_introduction').html(brief_introduction)
    $('#movie_name2').html(movie_name)
        // 3. 按需渲染电影图片
    $('#movie_pic').attr('src', movie.movie_pic)

}