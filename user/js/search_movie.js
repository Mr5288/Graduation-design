//获取顶部搜索框内容
var movie_name = window.parent.document.getElementById("searchtext").value;
//将搜索框内容赋值给页面搜索框
$('.sea').val(movie_name)


//根据内容搜索电影
$(function() {
    getMovieByName()


    function getMovieByName() {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:3007/my/getmovie/search_movies/' + movie_name,
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                if (res.data.length === 0) {
                    $("#no").attr("class", "no yes");
                    window.parent.document.getElementById("searchtext").value = "";
                } else {
                    console.log(res)
                    var htmlStr = template('tpl-movies', res) //将获取信息套用模板引擎
                    console.log(htmlStr);
                    $('#movies-list').html(htmlStr)
                    window.parent.document.getElementById("searchtext").value = "";
                    getmovieinfo()
                }



            }
        })
    }

    //为搜索按钮绑定点击事件

    $('body').on('click', '.btn', function() {
        var movie_name = $('.sea').val()
        if (movie_name == "") {
            alert('查询内容为空！');
        } else {
            getMovieByName()

            function getMovieByName() {
                $.ajax({
                    method: 'GET',
                    url: 'http://127.0.0.1:3007/my/getmovie/search_movies/' + movie_name,
                    headers: {
                        Authorization: localStorage.getItem('token') || ''
                    },
                    success: function(res) {
                        console.log(res.data.length);
                        if (res.data.length === 0) {
                            $("#no").attr("class", "no yes");
                        } else {
                            $("#no").attr("class", "no not");
                            var htmlStr = template('tpl-movies', res) //将获取信息套用模板引擎
                            console.log(htmlStr);
                            $('#movies-list').html(htmlStr)
                            getmovieinfo()
                        }

                        //将数据赋值给模板
                        // renderMoie_pic(res.data)
                    }
                })
            }
        };
    })
})

function getmovieinfo() {
    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    $('.movie-list-page').on('click', '.btn-edit', function() {
        var id = $(this).attr('data-id') //获取点击事件所在的ID
        var movieid = window.parent.document.getElementById("movie-id"); //拿到隐藏在导航栏处input标签
        movieid.value = id; //将ID赋值给input标签
        window.location.href = "./movieinfo.html?" + id; //跳转链接加所在ID去请求对应的电影信息
    })
}