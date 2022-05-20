//获取用户信息以及头像
$(function() {
    var form = layui.form
    var layer = layui.layer
        // form.verify({
        //   nickname: function(value) {
        //     if (value.length > 6) {
        //       return '昵称长度必须在 1 ~ 6 个字符之间！'
        //     }
        //   }
        // })

    initUserInfo()
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

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res)
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data)
                renderAvatar(res.data)
            }
        })
    }

    function renderAvatar(user) {
        // 1. 获取用户的名称
        var name = user.username
            // 1.1设置欢迎的文本
        $('#user-name').html(name)
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

})

//更新用户信息函数
$(function() {

    var layer = layui.layer

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        $('#sex').val('')
        $('#phone').val('')
        $('#email').val('')
            //initUserInfo()
    })

    // 监听表单的提交事件
    $('.infoform').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/userinfo',
            data: $(this).serialize(),
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                if (res.status !== 0) {
                    var message = res.message
                    return layer.msg(message)
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.initUserInfo()
            }
        })
    })
})

//更新密码函数
$(function() {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })

    //密码点击确认事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/updatepwd',
            data: $(this).serialize(),
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                if (res.status !== 0) {
                    var message = res.message
                    return layer.msg(message)
                }
                layui.layer.msg('更新密码成功！')
                    // 重置表单
                $('.pswd')[0].reset()

            }
        })
    })
})


//更新头像函数
$(function() {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', function(e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
            // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
            // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 为确定按钮，绑定点击事件
    $('#btnUpload').on('click', function() {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 2. 调用接口，把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: 'http://127.0.0.1:3007/my/update/avatar',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    var message = res.message
                    return layer.msg(message)
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})