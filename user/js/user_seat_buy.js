$(function() {
    //获取座椅区域点击事件
    $(".row span").click(function() {

        $(this).toggleClass("selected") //点击给类切换样式

        var price = $("#price_sum").text() //拿到总价格的文本
        var className = $(this).prop("className") //拿到座位类名
        var movie_price = $('#price').text() //拿到电影价格区域文本
        var data_row_id = $(this).attr("data-row-id") //拿到座位行
        var data_column_id = $(this).attr("data-column-id") //拿到座位列
        var data_index = data_row_id + '_' + data_column_id //拿到座位坐标

        if (className == 'seat selectable selected') { //如果座椅类名为绿色表明已选中座椅

            $('.has-ticket').addClass("no-ticket") //显示座位区域
            $('#price_sum').text(price * 1 + movie_price * 1) //更改价格
            $('<span class="ticket">' + (data_row_id) + '排' + data_column_id + '座</span>') //新增座位显示区标签
                .attr({ 'data-row-id': data_row_id, 'data-column-id': data_column_id, 'id': 'S' + data_row_id + '_' + data_column_id }) //给座位显示区标签增加属性
                .appendTo('#tickets') //增加显示座位信息标签
            var change = $(".ticket-container").children(".ticket").length;
            //拿到选择座位的个数
            if (change > 4) { //如果座椅选择数超过四个
                layer.open({ //弹出提示信息
                    title: '注意',
                    content: '一次只能购买四个座位哟'
                });
                $(this).attr("class", "seat selectable") //将第五个座位的类换成白色座椅
                $("#S" + data_index).remove() //移除第五个座位显示区的文本
                $('#price_sum').text(price) //第五个座位价格禁止增加
            }
        } else if (className == 'seat selectable') { //如果座椅类名显示为白色表明已经取消座位

            $("#S" + data_index).remove() //根据座位id移除座位
            $('#price_sum').text(price - movie_price) //移除座位后并修改价格(总价-一张票价)

        }

    });
});