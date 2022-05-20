// 定义格式化时间的过滤器
template.defaults.imports.dateFormat = function(dtStr) {
    var dt = new Date(dtStr)
    return moment(dt).format('YYYY-MM-DD HH:mm:ss');
}


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


$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 10, // 每页显示几条数据，默认每页显示10条
        statue: '', // 状态
        type: '', // 类型
        username: '', //用户名
        ordernum: '', //订单编号

    }
    getAdminCinema()

    function getAdminCinema() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/cinma/getadmincinema',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: q,
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function(obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                console.log(first)
                console.log(obj.curr)
                    // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                    // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit
                    // 根据最新的 q 获取对应的数据列表，并渲染表格
                    // getOrdersList()
                if (!first) {
                    getAdminCinema()
                }
            }
        })
    }


    // 通过代理的形式，为 btn-add 按钮绑定点击事件
    var indexEdit = null
    $('.cinema').on('click', '.btn-add', function() {
        // 弹出一个修改用户管理信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['600px', '450px'],
            title: '管理影厅信息',
            content: $('#dialog-add').html()
        })
        var cinema_name = $(this).text()
        $('#cinema_name').val(cinema_name)
    })

    // 通过代理的形式，为添加放映厅的表单绑定 submit 事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/cinma/addcinema',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    var message = res.message
                    return layer.msg(message)
                }
                layer.msg('添加放映数据成功！')
                layer.close(indexEdit)
                getAdminCinema()
            }
        })
    })

    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('body').on('click', '.btn-edit', function() {
        // 弹出一个修改用户管理信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['600px', '450px'],
            title: '管理影厅信息',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id')
            //发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/cinma/getcinemaid/' + id,
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，为更新放映厅的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/cinma/updatecinema',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    var message = res.message
                    return layer.msg(message)
                }
                layer.msg('更新放映数据成功！')
                layer.close(indexEdit)
                getAdminCinema()
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
                url: 'http://127.0.0.1:3007/my/cinma/deletecinema/' + id,
                headers: {
                    Authorization: localStorage.getItem('token') || ''
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除放映数据失败！')
                    }
                    layer.msg('删除放映数据成功！')
                    layer.close(index)
                    getAdminCinema()
                }
            })
        })
    })
})