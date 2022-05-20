 $(function() {

     getMovieList()
     getmovieinfo()

     // 获取电影的列表
     function getMovieList() {
         $.ajax({
             method: 'GET',
             url: 'http://127.0.0.1:3007/my/getmovie/getmoviesindex',
             headers: {
                 Authorization: localStorage.getItem('token') || ''
             },
             success: function(res) {
                 if (res.status !== 0) {
                     return layui.layer.msg('获取电影信息失败！')
                 }
                 var htmlStr = template('tpl-movies', res) //将获取信息套用模板引擎
                 $('#movies-list').html(htmlStr) //将数据赋值给模板
                     // renderMoie_pic(res.data)
             }
         })
     }

     function getmovieinfo() {
         // 通过代理的形式，为 btn-edit 按钮绑定点击事件
         $('.movie_page').on('click', '.btn-edit', function() {
             var id = $(this).attr('data-id') //获取点击事件所在的ID
             var movieid = window.parent.document.getElementById("movie-id"); //拿到隐藏在导航栏处input标签
             movieid.value = id; //将ID赋值给input标签
             window.location.href = "./movieinfo.html?" + id; //跳转链接加所在ID去请求对应的电影信息
         })
     }

     // $('#all_type').addClass('color')
     //$('#all_area').addClass('color')
     //$('#all_year').addClass('color')
     $('#type').on('click', '.click', function() {
         var id = $(this).attr('id')
         var movie_type = $(this).find('a').text()
         $('.click').attr('class', 'click') //实现单击哪个变哪个背景色
         $('#' + id).addClass('color click')
         if (movie_type == '全部') {
             $("#no").attr("class", "no not");
             getMovieList()
         } else(getMovietypeList())

         // 根据类型获取电影的列表
         function getMovietypeList() {
             $.ajax({
                 method: 'GET',
                 url: 'http://127.0.0.1:3007/my/getmovie/select_movies/' + movie_type,
                 headers: {
                     Authorization: localStorage.getItem('token') || ''
                 },
                 success: function(res) {
                     if (res.data.length === 0) {
                         $("#no").attr("class", "no yes");
                         var htmlStr = template('tpl-movies', res) //将获取信息套用模板引擎
                         $('#movies-list').html(htmlStr) //将数据赋值给模板
                     } else {
                         $("#no").attr("class", "no not");
                         var htmlStr = template('tpl-movies', res) //将获取信息套用模板引擎
                         $('#movies-list').html(htmlStr) //将数据赋值给模板
                     }
                 }
             })
         }


     })
     $('#area').on('click', '.click2', function() {

         var id = $(this).attr('id')
         $('#all_area').attr('class', 'click2')
         $('.click2').attr('class', 'click2')
         $('#' + id).addClass('color click2')
             // $("#no").attr("class", "no not")
     })
     $('#year').on('click', '.click3', function() {

         var id = $(this).attr('id')
         console.log(id);

         $('#all_year').attr('class', 'click3')
         $('.click3').attr('class', 'click3')
         $('#' + id).addClass('color click3')

     })
 })