<template lang="">
  <el-row>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header" class="clearfix right">
            <div><img src="~assets/image/1.jpeg" alt=""></div>
            <div class="shenfen">
              <p class="user">admin</p>
              <p class="a">超级管理员</p>
            </div>
          </div>
          <div class="text item">
            <span>上次登录时间：</span><span class="a">2017-09-01</span>
          </div>
          <div class="text item">
            <span>上次登录地点：</span><span class="a">北京</span>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top:20px;height:460px;">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column v-for="item,key in navdata" :key="key" :prop="key" :label="item" width="132">
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
    <el-col :span="15">
      <div class="num">
        <el-card class="item_six" v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
          <i class="icon" :class="'el-icon-'+item.icon" :style="{background:item.color}"> </i>
          <div class="detail">
            <p class="value">￥{{item.value}}</p>
            <p class="text_name">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:407px;margin-top: 10px;">
        <echart :chartbasedata="echartdata.line" style="height:407px;" />
      </el-card>
      <div class="chart_two">
        <el-card style="height:270px;width: 50%;margin: 5px;">
          <echart :chartbasedata="echartdata.user" style="height:270px;width: 100%;" />
        </el-card>
        <el-card style="height:270px;width: 50%;margin: 5px;">
          <echart :chartbasedata="echartdata.pie" :is-echart-type="false" style="height:240px;width: 100%;" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import { gethomedata } from 'network/home'
  import Echart from 'components/common/Echart'
  export default {
    name: 'Home',
    data() {
      return {
        tableData: [],
        navdata: {
          name: '企业',
          type: '产品',
          date: '今日销量',
          alldata: '总销量'
        },
        countData: [
          {
            name: "今日支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "今日收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "今日未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
          {
            name: "本月支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "本月收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "本月未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
        ],
        echartdata: {
          user: {
            xdata: [],
            lengnd: [],
            series: []
          },
          line: {
            xdata: [],
            lengnd: [],
            series: []
          },
          pie: {
            series: []
          }
        }
      }
    },
    components: {
      Echart
    },
    mounted() {
      gethomedata().then(res => {
        if (res.code === 20000) {
          //基础数据
          const basedata = res.data
          //左边的表格
          //对请求到的值进行保存
          this.tableData.push(...basedata.tableData)

          //折线图
          //获取折线图的所有数据
          const order = basedata.orderData
          //得到所有数据中的x轴坐标数据
          const xdata = order.date
          //得到数据对象的key值组成一个数组
          const keyarry = Object.keys(order.data[0])
          //options的配置数据之一series
          const series = []
          keyarry.forEach(key => {
            series.push({
              name: key,
              //将每个数组对象中对应key值的value取出来添加到同一个数组中
              data: order.data.map(item => item[key]),
              type: 'line'
            })
          })
          this.echartdata.line.lengnd = keyarry
          this.echartdata.line.xdata = xdata
          this.echartdata.line.series = series

          //用户柱状图
          this.echartdata.user.lengnd = ['新增用户', '活跃用户']
          this.echartdata.user.xdata = basedata.userData.map(item => item.date)
          this.echartdata.user.series = [
            {
              name: '新增用户',
              data: basedata.userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: basedata.userData.map(item => item.active),
              type: 'bar'
            }
          ]
          
          //饼状图
          this.echartdata.pie.series = [
            {
              data: basedata.videoData,
              type: 'pie'
            }
          ]
        } else {
          console.log('请求数据失败')
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .el-col {
    margin-left: 20px;
  }

  .clearfix img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  .item {
    font-size: 12px;
  }

  .a {
    margin-left: 20%;
  }

  .user {
    margin-left: 20%;
    font-size: 30px;

  }

  .right {
    display: flex;
  }

  .shenfen {
    margin-left: 10%;
    margin-top: 5%;
    text-align: center;

    p {
      width: 100%
    }
  }

  .icon {
    width: 100px;
    color: white;
    text-align: center;
    line-height: 100px;
    font-size: 35px;
    height: 100px;
  }

  .item_six {
    width: 250px;
    margin-right: 5px;
    margin-left: 5px;
    height: 100px;
  }

  .detail {
    width: 100%;
  }

  .value {
    text-align: center;
    font-weight: 500;
    font-size: 20px;
  }

  .text_name {
    text-align: center;
    font-size: 12px;
  }

  .num {
    display: flex;
  }

  .chart_two {
    display: flex;
  }
</style>