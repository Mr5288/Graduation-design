$(function() {

    getactorinfo()
    var layer = layui.layer
        // 获取电影的基本信息

})

function getactorinfo() {
    var id = location.search.substr(1)
        //var actorid = parseInt(url)
        // 发起请求获取对应分类的数据
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:3007/my/getmovie/actors/' + id,
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {

            renderMoie_pic(res.data)
        }

        //renderMoie_pic(res.data)

    })
}

function renderMoie_pic(actor) {
    // 1. 获取电影相关信息
    var actor_name = actor.actor_name
    var actor_enname = actor.actor_enname
    var actor_type = actor.actor_type //.substring(0, 10)
    var actor_time = actor.actor_time
    var area = actor.area
    var release_time = actor.release_time
    var brief_introduction = actor.brief_introduction
        // 1.1设置相关信息
    $('#actor_name').html(actor_name)
    $('#actor_enname').html(actor_enname)
    $('#actor_type').html(actor_type)
    $('actor_time1').html(actor_time)
    $('#area').html(area)
    $('#release_time').html(release_time)
    $('#brief_introduction').html(brief_introduction)
    $('#actor_name2').html(actor_name)
        // 3. 按需渲染电影图片
    $('#actor_pic').attr('src', actor.actor_pic)

}