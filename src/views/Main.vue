<template>
  <div class="Main">
    <el-container style="height:100%">
      <el-aside width="auto">
        <navmenu/>
      </el-aside>
      <el-container>
        <el-header>
          <nav-header/>
          <tag/>
        </el-header>
        <el-main style="margin-top: 3%;">
          <router-view exclude="login"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navmenu from 'components/common/Navmenu'
import Tag from 'components/common/Tag'
import NavHeader from 'components/content/NavHeader'

export default {
  name: 'Main',
  components: {
    Navmenu,
    NavHeader,
    Tag
  }
}
</script>
<style lang="less" scoped>
.el-header{
  background-color: #eee;
}
.el-main{
  padding: 0;
}
</style>