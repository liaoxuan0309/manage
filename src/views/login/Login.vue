<template>
  <div id="login">
    <el-form :model="from" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-from">
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="账号" prop="username" label-width="80px">
        <el-input v-model="from.username" autocomplete="off" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="80px">
        <el-input type="password" v-model="from.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="login_sub">
        <el-button type="primary" @click="submitForm" class="login_sub">登录</el-button>
        <el-button @click="resetForm('ruleForm')" >清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Mock from 'mockjs'
  import {getmenu} from 'network/user'
  export default {
    name: 'Login',
    data() {
      return{
        from:{
          username:'',
          password:''
        },
        rules:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, message: '用户名长度不能低于3位', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm() {
        getmenu(this.from).then(res=>{
          if(res.code==20000){
            this.$store.commit('clearmenu')
            this.$store.commit('setmenu',res.data.menu)
            this.$store.commit('setToken',res.data.token)
            this.$store.commit('addmenu',this.$router)
            this.$router.push({name:'home'})
          }else{
            this.$message.warning(res.data.message)
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
      console.log('超级管理员账号密码：admin，测试账号密码：test')
    }
  }
</script>
<style lang="less" scoped>
.login-from{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title{
  margin:0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_sub{
  margin:10px auto 0px auto;
  
}
</style>