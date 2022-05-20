   $(function() {

       var layer = layui.layer
           // 通过代理的形式，为 confirm-btn按钮绑定点击事件
       var indexAdd = null
       $('.confirm-order').on('click', '.confirm-btn', function() {
           // 弹出一个确认订单的信息的层
           indexAdd = layer.open({
               type: 1,
               area: ['600px', '500px'],
               title: '订单信息',
               content: $('#dialog-add').html()
           })
           var movie_name = $('#movie_name').text()
           var movie_enname = $('#movie_enname').text()
           var cinema = $('#cinema_name').text()
           var seat = $('.ticket').text()
           var star_time = $('#star_time').text()
           var price = $('.price').text().replace(/\D+/g, "")
           var username = window.top.document.getElementById("user-name").value
           $('#username').val(username)
           $('#movie_name1').val(movie_name)
           $('#movie_enname1').val(movie_enname)
           $('#cinema1').val(cinema)
           $('#seat1').val(seat)
           $('#star_time1').val(star_time)
           $('#price1').val(price)
       })

       // 通过代理的形式，为 form-add 表单绑定 submit 事件
       $('body').on('submit', '#form-add', function(e) {
           e.preventDefault()
           $.ajax({
               method: 'POST',
               url: 'http://127.0.0.1:3007/my/order/addorder',
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

                   // 根据索引，关闭对应的弹出层
                   layer.close(indexAdd)

                   $('#done').attr('class', 'step done')
                   $('#done2').attr('class', ' step last done')
                   ChangeSeat()
                       //    var seat = $('.ticket').text() //获取座位信息
                       //    var data_row_id = seat.substring(0, 1) //拿到排
                       //    var data_column_id = seat.substring(2, 3) //拿到座
                       //    var data_index = data_row_id + '_' + data_column_id //将行和列组成座位id
                       //    $("#" + data_index).status("sold")
                   function ChangeSeat() {
                       var cinema = $('#cinema_name').text()
                       var movie_name = $('#movie_name').text()
                       var start_time = $('#star_time').text()

                       $.ajax({
                           method: 'get',
                           url: 'http://127.0.0.1:3007/my/order/getorderbyseat/' + cinema + '/' + movie_name + '/' + start_time,

                           headers: {
                               Authorization: localStorage.getItem('token') || ''
                           },
                           data: {},
                           success: function(res) {
                               $('span').remove('.ticket')
                               $('#price_sum').text(0)
                               AddClass(res.data)
                           }
                       })
                   }

               }
           })
       })

       function AddClass(arr) {
           //console.log(arr);
           //后台数据接收拿到数组arr[{seat:'x排x座'},{seat:'x排x座x排x座'}]...
           //arr[0]拿到的数据是{seat:'x排x座'}
           //arr[0].seat拿到的数据是x排x座
           //定义新数组，依次将arr[i].seat赋值给新数组 
           var num = []
               //循环语句依次执行将arr[i].seat 分别赋值给num[]
           for (var i = 0; i < arr.length; i++) {
               num = arr[i].seat
           }
           if (num.length == 4) {
               var seat_index = num[0] + '_' + num[2]
               document.getElementById(seat_index).classList.add("sold");
           } else if (num.length == 8) {
               var seat_index = num[0] + '_' + num[2]
               var seat_index2 = num[4] + '_' + num[6]
               document.getElementById(seat_index).classList.add("sold");
               document.getElementById(seat_index2).classList.add("sold");
           } else if (num.length == 12) {
               var seat_index = num[0] + '_' + num[2]
               var seat_index2 = num[4] + '_' + num[6]
               var seat_index3 = num[8] + '_' + num[10]
               document.getElementById(seat_index).classList.add("sold");
               document.getElementById(seat_index2).classList.add("sold");
               document.getElementById(seat_index3).classList.add("sold");
           } else if (num.length == 16) {
               var seat_index = num[0] + '_' + num[2]
               var seat_index2 = num[4] + '_' + num[6]
               var seat_index3 = num[8] + '_' + num[10]
               var seat_index4 = num[12] + '_' + num[14]
               document.getElementById(seat_index).classList.add("sold");
               document.getElementById(seat_index2).classList.add("sold");
               document.getElementById(seat_index3).classList.add("sold");
               document.getElementById(seat_index4).classList.add("sold");
           }

       }
   })