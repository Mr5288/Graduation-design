// 定义格式化时间的过滤器
template.defaults.imports.dateFormat = function A(dtStr) {
    var dt = new Date(dtStr)
    return moment(dt).format('YYYY-MM-DD HH:mm:ss');
}

// 定义状态显示
template.defaults.imports.dateState = function(dtStr) {

    var now_time = new Date(moment().format("YYYY-MM-DD HH:mm:ss"))
    var star_time = new Date(dtStr)
    var end_time = new Date(moment(star_time).add(150, 'm'))
    if (star_time.getTime() > now_time.getTime()) return dtStr = '未开始';
    // else if (star_time.getTime() < now_time.getTime() && now_time < end_time.getTime()) return dtStr = '进行中';
    else return dtStr = '已结束'
}

$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 10, // 每页显示几条数据，默认每页显示10条
        state: '', // 状态
        type: '', // 类型
        username: '', //用户名
        ordernum: '', //订单编号

    }

    getOrdersList()
    getRefundList()

    // 获取订单的列表
    function getOrdersList() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/order/getuserorder',
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

    // 获取订单的列表
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
    // 为筛选表单绑定 submit 事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        var state = $('[name=state]').val()
        var type = $('[name=type]').val()
        var ordernum = $('[name=ordernum]').val()
        var username = $('[name=username]').val()
            // 为查询参数对象 q 中对应的属性赋值
        q.state = state
        q.type = type
        q.ordernum = ordernum
        q.username = username
            // 根据最新的筛选条件，重新渲染表格的数据
        getOrdersList()
    })

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
                    getOrdersList()
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
            area: ['550px', '500px'],
            title: '订单详情',
            content: $('#dialog-edit').html()
        })
        var currentRow = $(this).closest("tr");
        var state = currentRow.find("td:eq(6)").text();
        if (state == ' 已结束 ' || state == ' 已退款' || state == ' 未开始 ') {
            $('#btn').attr("disabled", true);
            $('#btn').attr('class', 'layui-btn layui-btn-disabled')
        } else {
            $('#btn').attr('class', 'layui-btn ')

        }

        var id = $(this).attr('data-id')
            // 发起请求获取对应分类的数据
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
            url: 'http://127.0.0.1:3007/my/orders/updatemovieorderss',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('退款失败！')
                }
                layer.msg('退款成功！')
                layer.close(indexEdit)
                getOrdersList()
                getRefundList()
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
                    getOrdersList()
                    layer.close(index)

                }
            })
        })
    })
})