$(function() {
    var layer = layui.layer
    var form = layui.form


    // 定义格式化时间的过滤器
    template.defaults.imports.dateFormat = function(dtStr) {
        var dt = new Date(dtStr)
        return moment(dt).format('YYYY-MM-DD HH:mm:ss');
    }
    initArtCateList()
    getRefundList()
        // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = './admin-login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

    // 获取餐饮管理的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/food/getfood',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取餐饮列表失败！')
                }
                //使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', res)
                $('#food-list').html(htmlStr)

            }
        })
    }

    // 为添加类别按钮绑定点击事件
    var indexAdd = null
    $('body').on('click', '#addfood', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['550px', '400px'],
            title: '添加产品',
            content: $('#dialog-add').html()
        })
    })


    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/food/addfood',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    var message = res.message
                    return layer.msg(message)
                }
                layer.msg('新增产品成功！')
                initArtCateList()
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })


    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('#food-list').on('click', '.btn-edit', function() {
        // 弹出一个修改用户管理信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['400px', '300px'],
            title: '编辑产品信息',
            content: $('#dialog-edit').html()
        })

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/food/getfood/' + id,
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
            url: 'http://127.0.0.1:3007/my/food/updatefood',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    var message = res.message
                    return layer.msg(message)
                }
                layer.msg('更新产品数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 通过代理的形式，为删除按钮绑定点击事件
    $('#food-list').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // 提示用户是否要删除
        layer.confirm('确认下架?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: 'http://127.0.0.1:3007/my/food/deletefood/' + id,
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                success: function(res) {
                    if (res.status !== 0) {
                        var message = res.message
                        return layer.msg(message)
                    }
                    layer.msg('删除产品成功！')

                    initArtCateList()

                }
            })
            layer.close(index)

        })
    })

    // 获取退订订单的数据
    function getRefundList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/order/getrefund',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                $('.layui-badge').text(res.data[0].state)
            }
        })
    }
})