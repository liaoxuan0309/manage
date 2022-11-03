import Vue from 'vue'
import Vuex from 'vuex'
import isnavmenu from './isnavmenu'
import userinfo from './userinfo'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    isnavmenu,
    userinfo
  }
})
