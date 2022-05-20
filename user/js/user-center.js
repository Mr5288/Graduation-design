$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()
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
            $('.user_p')
                .attr('src', user.user_pic)
                .show()
            $('.text-avatar').hide()
        } else {
            // 3.2 渲染文本头像
            $('.user_p').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar')
                .html(first)
                .show()
        }
    }
})