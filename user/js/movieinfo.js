$(function() {

    getmovieinfo()
    var layer = layui.layer
        // 获取电影的基本信息

})


function getmovieinfo() {

    // 通过代理的形式，为 btn-edit 按钮绑定点击事件

    $('.hotmovie').on('click', '.btn-edit', function() {
        var id = $(this).attr('data-id')
        var movieid = window.parent.document.getElementById("movie-id");
        movieid.value = id;
        window.location.href = "./movieinfo.html?" + id;
    })

    $('body').on('click', '.btn-top', function() {
        var id = $(this).attr('data-id')
        var movieid = window.parent.document.getElementById("movie-id");
        movieid.value = id;
        window.location.href = "./movieinfo.html?" + id;
    })

    $('body').on('click', '.btn-hot', function() {
        var id = $(this).attr('data-id')
        window.location.href = "./actorinfo.html?" + id;
    })

    $('body').on('click', '.btn-movies', function() {
        var id = $(this).attr('data-id')
        var movieid = window.parent.document.getElementById("movie-id");
        movieid.value = id;
        window.location.href = "./movieinfo.html?" + id;
    })
}