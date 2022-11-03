<template>
  <div ref="echart">

  </div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    name: 'Echart',
    props: {
      //记录是否是折线图或者柱状图
      isEchartType: {
        type: Boolean,
        default: true
      },
      chartbasedata: {
        type: Object,
        default() {
          return {
            //x轴数据
            xdata: [],
            lengnd:[],
            //图标数据
            series: []
          }
        }
      }
    },
    watch:{
      chartbasedata:{
        handler:function(){
          this.initchart()
        },
        deep:true
      }
    },
    methods:{
      initchart(){
        this.initdata()
        if(this.echart){
          this.echart.setOption(this.istype)
        }else{
          this.echart = echarts.init(this.$refs.echart)
          this.echart.setOption(this.istype)
        }
      },
      initdata(){
        if(this.isEchartType){
          this.axisOption.xAxis.data = this.chartbasedata.xdata
          this.axisOption.legend.data = this.chartbasedata.lengnd
          this.axisOption.series = this.chartbasedata.series
        }else{
          this.normalOption.series = this.chartbasedata.series
        }
      }
    },
    data() {
      return {
        axisOption: {
          xAxis: {
              data: []
            },
            yAxis: {},
            //示例的数据
            legend: {
              data: []
            },
            //表中间折线的数据
            series: [],
            //鼠标悬停显示数据的配置
            tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
              trigger: 'axis',
              backgroundColor: 'rgba(32, 33, 36,.7)',
              borderColor: 'rgba(32, 33, 36,0.20)',
              borderWidth: 1,
              textStyle: { // 文字提示样式
                color: '#fff',
                fontSize: '12'
              },
              axisPointer: { // 坐标轴虚线
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              },
            }
        },
        normalOption:{
          series: []
        },
        //接收echarts init方法产生的对象
        echart:null
      }
    },
    computed: {
      istype() {
        return this.isEchartType ? this.axisOption : this.normalOption
    }
    }
  }
</script>
<style lang="less" scoped>

</style>