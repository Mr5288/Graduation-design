// 定义格式化时间的过滤器
template.defaults.imports.dateFormat = function(dtStr) {
    var dt = new Date(dtStr)
    return moment(dt).format('YYYY-MM-DD HH:mm:ss');
}

$(function() {
    var layer = layui.layer
    var form = layui.form

    initFoodList()
    initDrinkList()

    // 获取食品订单的列表
    function initFoodList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/foods/getusefood',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                var htmlStr = template('tpl-eattable', res)
                $('#eat-list').html(htmlStr)
            }
        })
    }
    // 获取饮品订单的列表
    function initDrinkList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/foods/getusedrink',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                var htmlStr = template('tpl-drinktable', res)
                $('#drink-list').html(htmlStr)
            }
        })
    }
    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('body').on('click', '.btn-buy', function() {
        // 弹出一个获取订单详情信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['600px', '400px'],
            title: '订单详情',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/foods/getusefood/' + id,
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                form.val('form-edit', res.data)
                var username = window.parent.document.getElementById("user-name").value;
                $('#username').val(username)
                $('#food_num').val(1)
                $('#food_num').blur(function() {
                    var num = $('#food_num').val()
                    var price = res.data.food_price
                    var sum_price = num * price
                    $('#food_price').val(sum_price)
                })
            }
        })

    })

    // 通过代理的形式，为购买食品的表单绑定 submit 事件
    $('body').on('submit', '#form-buy', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/foods/buyusefood',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    var message = res.message
                    return layer.msg(message)
                }
                layer.msg('购买成功！')
                layer.close(indexEdit)
                initFoodList()
                initDrinkList()
            }
        })
    })

})