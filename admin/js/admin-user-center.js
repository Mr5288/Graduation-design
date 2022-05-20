$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()
    getRefundList()

    var layer = layui.layer

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
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:3007/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
            // 不论成功还是失败，最终都会调用 complete 回调函数
            // complete: function(res) {
            //   // console.log('执行了 complete 回调：')
            //   // console.log(res)
            //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //     // 1. 强制清空 token
            //     localStorage.removeItem('token')
            //     // 2. 强制跳转到登录页面
            //     location.href = '/login.html'
            //   }
            // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.username
        // 2.获取用户的性别
    var sex = user.sex
        // 3.获取用户的邮箱
    var email = user.email
        //4.获取用户出生日期
    var birthday = user.birthday
        //5.获取用户手机
    var phone = user.phone
        // 1.1设置欢迎的文本
    $('#user-name').html(name)
    $('#user-name2').html(name)
        // 2.1 设置用户性别
    $('#user-sex').html(sex)
        //.2.2设置用户邮箱
    $('#user-email').html(email)
        //2.3获取用户出生日期
    $('#user-birthday').html(birthday)
        //2.4 获取用户手机号码
    $('#user-phone').html(phone)
        // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.user_p ')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.user_p ').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}

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
// function getFDate(date) {
//     var d = eval('new ' + date.substr(1, date.length - 2));

//     var ar_date = [d.getFullYear(), d.getMonth() + 1, d.getDate()];

//     for (var i = 0; i < ar_date.length; i++) ar_date[i] = dFormat(ar_date[i]);
//     return ar_date.join('-');
// }

// function dFormat(i) {
//     return i < 10 ? "0" + i.toString() : i;
// }
// getdFormat();