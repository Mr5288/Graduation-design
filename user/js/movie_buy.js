// 定义格式化时间的过滤器
template.defaults.imports.dateFormat = function(dtStr) {
    var dt = new Date(dtStr)
    return moment(dt).format('YYYY-MM-DD HH:mm:ss');
}

$(function() {

    initFoodList()
        //var movie_name = document.getElementById('movie_name').innerHTML;
        //console.log(movie_name);
        // 获取食品订单的列表
    function initFoodList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/cinma/getcinema',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: movie_name,
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

            }
        })

    }

})