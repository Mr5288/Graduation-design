$(function() {
    getMovieInfo()
    getCinemaInfo()
})

//获取电影基本信息
function getMovieInfo() {

    var id = window.top.document.getElementById("movie-id").value;

    //var movieid = parseInt(url)
    // 发起请求获取对应分类的数据
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:3007/my/getmovie/movies/' + id,
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {

            renderMoie_pic(res.data)
        }

        //renderMoie_pic(res.data)

    })
}
//渲染电影相关内容
function renderMoie_pic(movie) {
    // 1. 获取电影相关信息
    var movie_name = movie.movie_name
    var movie_type = movie.movie_type //.substring(0, 10)
    var movie_time = movie.movie_time
    var price = movie.price
    var movie_enname = movie.movie_enname
        // 1.1设置相关信息
    $('#movie_name').html(movie_name)
    $('#movie_type').html(movie_type)
    $('#movie_time1').html(movie_time)
    $('#movie_enname').html(movie_enname)
    $('#price').html(price)
        // 3. 按需渲染电影图片
    $('#movie_pic').attr('src', movie.movie_pic)

}
//获取影厅相关信息
function getCinemaInfo() {

    var id = location.search.substr(1)
        //  console.log(id);
        //var movieid = parseInt(url)
        // 发起请求获取对应分类的数据
    $.ajax({
        method: 'GET',
        url: 'http://127.0.0.1:3007/my/cinma/getcinemaid/' + id,
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {

            renderCinema_info(res.data)
        }

        //renderMoie_pic(res.data)

    })
}
//渲染影厅相关内容
function renderCinema_info(cinema) {
    // 1. 获取影厅相关信息
    var lan_ver = cinema.lan_ver
    var cinema_name = cinema.cinema_name
    var star_time = cinema.star_time
    var dt = new Date(star_time)
    var time = moment(dt).format('YYYY-MM-DD HH:mm');

    // 1.1设置相关信息
    $('#lan_ver').html(lan_ver)
    $('#cinema_name').html(cinema_name)
    $('#star_time').html(time)

    getChangeSeat()

    function getChangeSeat() {
        var cinema = $('#cinema_name').text()
        var movie_name = $('#movie_name').text()
        var start_time = $('#star_time').text()
            //.log(cinema);
        $.ajax({
            method: 'get',
            url: 'http://127.0.0.1:3007/my/order/getorderbyseat/' + cinema + '/' + movie_name + '/' + start_time,

            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function(res) {
                AddClass(res.data)
            }
        })
    }
}

function AddClass(seatarr) {
    //后台数据接收拿到数组seatarr[{seat:'x排x座'},{seat:'x排x座x排x座'}]...
    //seatarr[0]拿到的数据是{seat:'x排x座'}
    //seatarr[0].seat拿到的数据是x排x座
    //定义新数组，依次将seatarr[i].seat赋值给新数组 

    var seat_num = []
    for (var i = 0; i < seatarr.length; i++) {
        for (j = i; j <= i; j++) {
            seat_num[j] = seatarr[i].seat
        }
    }

    //开始循环数组，依次将已售座位修改红色座椅类名

    for (var i = 0; i < seatarr.length; i++) {
        if (seat_num[i].length == 4) {
            var seat = seat_num[i] //seat_num[]得到的是x排x座，要提取x则要将数组中的值赋给变量，再利用变量[]获取具体值
            var seat_index = seat[0] + '_' + seat[2]
            document.getElementById(seat_index).classList.add("sold");
        } else if (seat_num[i].length == 8) {
            var seat = seat_num[i]
            var seat_index = seat[0] + '_' + seat[2]
            var seat_index2 = seat[4] + '_' + seat[6]
            document.getElementById(seat_index).classList.add("sold");
            document.getElementById(seat_index2).classList.add("sold");
        } else if (seat_num[i].length == 12) {
            var seat = seat_num[i]
            var seat_index = seat[0] + '_' + seat[2]
            var seat_index2 = seat[4] + '_' + seat[6]
            var seat_index3 = seat[8] + '_' + seat[10]
            document.getElementById(seat_index).classList.add("sold");
            document.getElementById(seat_index2).classList.add("sold");
            document.getElementById(seat_index3).classList.add("sold");
        } else if (seat_num[i].length == 16) {
            var seat = seat_num[i]
            var seat_index = seat[0] + '_' + seat[2]
            var seat_index2 = seat[4] + '_' + seat[6]
            var seat_index3 = seat[8] + '_' + seat[10]
            var seat_index4 = seat[12] + '_' + seat[14]
            document.getElementById(seat_index).classList.add("sold");
            document.getElementById(seat_index2).classList.add("sold");
            document.getElementById(seat_index3).classList.add("sold");
            document.getElementById(seat_index4).classList.add("sold");
        }
    }


}