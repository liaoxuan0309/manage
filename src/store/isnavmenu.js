import Cookie from 'js-cookie'
export default {
  state: {
    iscollapse: false,
    headbarlist: [
      {path:'/home',name:'home',lable:'首页',icon:'s-home',url:'home/Home'}
    ],
    isclick:null,
    menu:[]
  },
  mutations: {
    //是否展开
    collapsemenu(state) {
      state.iscollapse = !state.iscollapse
    },
    //添加
    addheadbarlist(state,payload) {
      if (payload.name !== 'home') {
        state.isclick = payload
        const resoult = state.headbarlist.findIndex(item => item.name === payload.name)
        if (resoult === -1) {
          state.headbarlist.push(payload)
        }
      } else {
        state.isclick = null
      }
    },
    //删除
    sublist(state,payload) {
      const a = state.headbarlist.findIndex(item => item.name === payload.name)
      if (a != -1) {
        state.headbarlist.splice(a,1)
      }
    },
    //以cookie保存菜单数据
    setmenu(state,payload) {
      state.menu = payload
      Cookie.set('menu',JSON.stringify(payload))
    },
    //删除cookie
    clearmenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    //添加菜单
    addmenu(state,router) {
      if (!Cookie.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuarray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(child => {
              child.component =()=>import(`views/${child.url}`)
              return child 
          })
          menuarray.push(...item.children)
        } else {
          item.component = () => import(`views/${item.url}`)
          menuarray.push(item)
        }
      });
      menuarray.forEach(item => {
        router.addRoute('main',item)
      })
    }
  }
}