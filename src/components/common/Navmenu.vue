<template >
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="isrouter" :collapse="getisnavmenu">
    <h3 class="title">{{getisnavmenu ? '后台' :'后台管理'}}</h3>
    <el-menu-item v-for="item in nochild" :index="item.path" @click="click(item)" :key="item.path">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.lable}}</span>
    </el-menu-item>
    <el-submenu v-for="(item,index) in ischild" :index="item.lable" :key="index">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.lable}}</span>
      </template>
      <el-menu-item-group v-for="(page,pageindex) in item.children" :key="pageindex">
        <el-menu-item :index="page.path" @click="click(page)">{{page.lable}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
    name:'Navmenu',
    data() {
      return {
        isrouter:true,
        menu:[]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        /* console.log(key, keyPath); */
      },
      handleClose(key, keyPath) {
        /* console.log(key, keyPath); */
      },
      click(item){
        this.$store.commit('addheadbarlist',item)
      }
    },
    computed:{
      ischild(){
        return this.asyncmenu.filter(item=> item.children)
      },
      nochild(){
        return this.asyncmenu.filter(item=> !item.children)
      },
      getisnavmenu(){
        return this.$store.state.isnavmenu.iscollapse
      },
      asyncmenu(){
        return this.$store.state.isnavmenu.menu
      }
    }
  }
</script>
<style scoped>
   .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
  }
  .title{
    text-align:center;
  }
</style>