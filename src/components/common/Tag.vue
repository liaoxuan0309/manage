<template>
  <div class="jianju">
    <el-tag v-for="(tag,index) in tags" :key="tag.name" :closable="tag.name!=='home'"
      :effect="$route.name ===tag.name?'dark':'plain'" @click="push(tag)" @close="close(tag,index)">
      {{tag.lable}}
    </el-tag>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Tag',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        tags: state => state.isnavmenu.headbarlist
      })
    },
    methods: {
      ...mapMutations(['sublist']),
      push(tag) {
        this.$router.push(tag.name)
      },
      close(tag, index) {
        
        const length = this.tags.length - 1
        this.sublist(tag)
        if (tag.name !== this.$route.name) {
          return
        }
        if (index === length) {
          this.$router.push(this.tags[index - 1].name)
        } else {
          this.$router.push(this.tags[index].name)
        }
        
      }
    },
  }
</script>
<style lang="less" scoped>
  .jianju {
    padding: 10px;

    .el-tag {
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>