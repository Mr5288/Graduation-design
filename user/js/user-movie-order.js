// 定义格式化时间的过滤器
template.defaults.imports.dateFormat = function(dtStr) {
    var dt = new Date(dtStr)
    return moment(dt).format('YYYY-MM-DD HH:mm:ss');
}

// 定义状态显示
template.defaults.imports.dateState = function(dtStr) {

    var now_time = new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
    var star_time = new Date(dtStr)
    var end_time = new Date(moment(star_time).add(150, 'm'))
    if (end_time < now_time) return '已结束';
    else if (star_time < now_time && now_time < end_time) return '进行中';
    else return '未开始'
}



$(function() {
    var layer = layui.layer
    var form = layui.form

    initMovieOrderList()


    // 获取电影订单的列表
    function initMovieOrderList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/orders/getusermovieorder',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                if (res.data.length == 0) {
                    $('#not').attr('class', 'no yes')
                } else {
                    $('#not').attr('class', 'no not')
                    var htmlStr = template('tpl-movietable', res)
                    $('#Morder-list').html(htmlStr)
                }

            }
        })
    }

    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改订单信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['550px', '480px'],
            title: '订单详情',
            content: $('#dialog-edit').html()
        })
        var currentRow = $(this).closest("tr");
        var state = currentRow.find("td:eq(7)").text();
        console.log(state);
        if (state == ' 已结束 ') {
            $('<p style="text-align:center">电影已经开始啦，不能退票咯</p>').insertAfter("#price");
            $('#btn').attr('class', 'layui-btn layui-btn-disabled')
            $('#btn').attr("disabled", true);
        } else if (state == ' 已退款') {
            $('<p style="text-align:center">已经退完啦，不能再退咯</p>').insertAfter("#price");
            $('#btn').attr('class', 'layui-btn layui-btn-disabled')
            $('#btn').attr("disabled", true);
        } else if (state == ' 退款中 ') {
            $('<p style="text-align:center">已经申请啦，不能再申请咯</p>').insertAfter("#price");
            $('#btn').attr('class', 'layui-btn layui-btn-disabled')
            $('#btn').attr("disabled", true);
        } else {
            $('#btn').attr('class', 'layui-btn ')
        }
        var id = $(this).attr('data-id')
            //发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/orders/getmovieorders/' + id,
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，为修改用户的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/orders/updatemovieorders',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('退订订单失败！')
                }
                layer.msg('退订订单申请成功！')
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
                url: 'http://127.0.0.1:3007/my/orders/deletemovieorders/' + id,
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除订单失败！')
                    }
                    layer.msg('删除订单成功！')
                    initMovieOrderList()
                    layer.close(index)
                }
            })
        })
    })
})