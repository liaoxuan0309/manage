<template>
  <div class="commontable">
    <el-table :data="tabledata" height="75vh" stripe >
      <el-table-column
        show-overflow-tooltip
        v-for="item in tablelabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width?item.width:125"
      >
        <template slot-scope="scope">
          <div>
            <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </div>
        </template>
        
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="pagechange"
      :page-size="20"
      >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name:'Commontable',
  props:{
    tabledata:Array,
    tablelabel:Array,
    config:Object
  },
  methods:{
    edit(row){
      this.$emit('edituser',row)
    },
    del(row){
      this.$emit('deluser',row)
    },
    pagechange(page){
      this.$emit('change',page)
    }
  }
}
</script>
<style lang="less" scoped>
  .commontable{
    height:calc(100% - 62px);
    background-color:#fff;
    position: relative;
  }
  .pager {
      margin-top: 10px;
      float: right;
    }
</style>