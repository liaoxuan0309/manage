import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'network/mock/mock.js'
//使用this.$http.post方法的插件
import VueResource from "vue-resource"

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
//安装
Vue.use(VueResource);


Vue.config.productionTip = false

//导航守卫，在跳转之前做一些判断
router.beforeEach((to,from,next) => { 
  store.commit('getToken')
  const token = store.state.userinfo.token
  if (!token &&to.name!=='login') {
    next({name:'login'})
  } else if (token&&to.name=='login') {
    next({name:'home'})
  }
  else {
    next()
  }
})

new Vue({
  router,
  store,
  //每次vue创建就根据cookie中的数据定义router
  created() {
    store.commit('addmenu',router)
  },
  render: h => h(App)
}).$mount('#app')
