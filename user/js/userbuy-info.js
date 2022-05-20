// 定义格式化时间的过滤器
template.defaults.imports.dateFormat = function(dtStr) {
    var dt = new Date(dtStr)
    return moment(dt).format('HH:mm');
}

var time = new Date()
    //var time2 = new Date().getTime() + 24 * 60 * 60 * 1000

$('#today').text(moment(time).format('今天M月D日'))
    //$('#today2').text(moment(time2).format('明天M月D日'))

$(function() {
    getmovieinfo()
})

// 获取电影的基本信息
function getmovieinfo() {

    var id = window.top.document.getElementById("movie-id").value;
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

//渲染电影信息
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

    initFoodList()

    // 获取电影影厅排片的列表
    function initFoodList() {
        var cinematime = moment(time).format('MM-DD') //统一时间格式只展示具体时间
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/cinma/getcinema/' + movie_name + '/' + cinematime,
            headers: {
                Authorization: localStorage.getItem('token') || ''
            }, //查询带上用户token身份信息
            success: function(res) {
                if (res.data.length == 0) {
                    $(".no").attr("class", "no yes"); //如查询结构为空，则切换盒子类名提示用户
                } else {
                    $(".no").attr("class", "no not"); //将提示盒子隐藏
                    var htmlStr = template('tpl-table', res) //将查询结果通过template引擎依次渲染
                    $('tbody').html(htmlStr)
                    $("tr:even").css("background", "#f7f7f7"); //隔行变颜色
                }

            }
        })

    }
}

// 通过代理的形式，为 btn-edit 按钮绑定点击事件
var indexEdit = null
$('tbody').on('click', '.btn-edit', function() {

    var id = $(this).attr('data-id')
    window.location.href = "./moviebuy_seat.html?" + id;
})