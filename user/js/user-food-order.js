// 定义格式化时间的过滤器
template.defaults.imports.dateFormat = function(dtStr) {
    var dt = new Date(dtStr)
    return moment(dt).format('YYYY-MM-DD HH:mm:ss');
}

// 定义状态的过滤器
template.defaults.imports.dateState = function(dtStr) {
    var dtStr = '已完成'
    return dtStr;
}

$(function() {
    var layer = layui.layer
    var form = layui.form


    initFoodList()

    // 获取食品订单的列表
    function initFoodList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/orders/getuserfoodorder',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                var htmlStr = template('tpl-foodtable', res)
                $('#Forder-list').html(htmlStr)

            }
        })
    }

    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改订单信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['650px', '550px'],
            title: '退订订单',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/orders/getmovieorders/' + id,
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                form.val('aaa', res.data)
            }
        })
    })

    // 通过代理的形式，为修改用户的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/order/updateorder',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户数据失败！')
                }
                layer.msg('更新用户数据成功！')
                layer.close(indexEdit)
                initMovieOrderList()
            }
        })
    })

    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: 'http://127.0.0.1:3007/my/orders/deletefoodorders/' + id,
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除订单失败！')
                    }
                    layer.msg('删除订单成功！')
                    initFoodList()
                    layer.close(index)

                }
            })
        })
    })



})