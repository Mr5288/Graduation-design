  getIndexSale()
  getIndexSale_date()

  // 获取销售数据的基本信息
  function getIndexSale() {
      $.ajax({
          method: 'GET',
          url: 'http://127.0.0.1:3007/my/getdata/getindexsale',
          headers: {
              Authorization: localStorage.getItem('token') || ''
          },
          success: function(res) {
              if (res.status !== 0) {
                  return layui.layer.msg('获取销售数据失败！')
              }
              // 调用 renderAvatar 渲染用户的头像
              data2(res.data)
          }

      })
  }

  // 根据日期获取销售数据的基本信息
  function getIndexSale_date() {
      $.ajax({
          method: 'GET',
          url: 'http://127.0.0.1:3007/my/getdata/getindexsale-date',
          headers: {
              Authorization: localStorage.getItem('token') || ''
          },
          success: function(res) {
              if (res.status !== 0) {
                  return layui.layer.msg('获取销售数据失败！')
              }
              // 调用 renderAvatar 渲染用户的头像
              data(res.data)
          }

      })
  }

  function data(sale) {
      var myChart = echarts.init(document.getElementById('data2'));
      var num1 = sale[0].num
      var num2 = sale[1].num
      var num3 = sale[2].num
      var num4 = sale[3].num
      var num5 = sale[4].num
      var num6 = sale[5].num
      var num7 = sale[6].num
      var price_1 = sale[0].price
      var price_2 = sale[1].price
      var price_3 = sale[2].price
      var price_4 = sale[3].price
      var price_5 = sale[4].price
      var price_6 = sale[5].price
      var price_7 = sale[6].price

      option = {
          color: ['red', '#fac858'],
          title: {
              text: '上周订单与销售额情况',
              top: '2%',
              left: '3%',
              right: '4%',
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: ['订单数', '销售额']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
          },
          yAxis: {
              type: 'value',

          },
          series: [{
                  name: '订单数',
                  type: 'line',
                  stack: 'Total',
                  data: [num1, num2, num3, num4, num5, num6, num7]
              }, {
                  name: '销售额',
                  type: 'line',
                  stack: 'Total',
                  data: [price_1, price_2, price_3, price_4, price_5, price_6, price_7]
              }

          ]
      };
      myChart.setOption(option);

  }


  function data2(sale) {
      var movie_name1 = sale[0].movie_name
      var movie_name2 = sale[1].movie_name
      var movie_name3 = sale[2].movie_name
      var price1 = sale[0].price
      var price2 = sale[1].price
      var price3 = sale[2].price
      var myChart = echarts.init(document.getElementById('data'));
      option = {

          title: {
              text: '电影热榜'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {},
          grid: {
              top: '18%',
              left: '1%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
          },
          yAxis: {
              type: 'category',
              data: [movie_name1, movie_name2, movie_name3]
          },
          series: [{
                  type: 'bar',
                  data: [price1, price2, price3],
                  itemStyle: {
                      normal: { //这里是重点
                          color: function(params) {
                              //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                              var colorList = ['#5470c6', '#91cc75', '#ee6666'];
                              return colorList[params.dataIndex]
                          }
                      }
                  }
              },

          ]
      };
      myChart.setOption(option);
  }