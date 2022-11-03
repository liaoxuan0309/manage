<template lang="">
<header>
    <div class="head_left">
      <el-button type="primary" icon="el-icon-menu" @click="menu()"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in list" :key="index" :to="{ path: item.path }">{{item.lable}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="head_right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="~assets/image/1.jpeg" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</header>
</template>
<script>
  import {mapState} from 'vuex'
export default {
  name:'NavHeader',
  computed:{
    ...mapState({
      list:state=>state.isnavmenu.headbarlist
    })
  },
  methods:{
    menu(){
       this.$store.commit('collapsemenu')
    },
    logout(){
      this.$store.commit('clearToken')
      this.$store.commit('clearmenu')
      this.$router.push('login')
    }
  }
}
</script>
<style lang="less" scoped>
  header{
    display: flex;
    height: 100%;
    justify-content:space-between;
    align-items: center;
  }
  .head_left{
    display:flex;
    align-items: center;
    .el-button {
      margin-right:20px;
    }
  }
  .head_right{
    .user{
      width: 45px;
      height:45px;
      border-radius:50%;
    }
  }
</style>