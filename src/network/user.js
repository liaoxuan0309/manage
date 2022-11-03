
import { request } from './request'

export { adduser,getuserlist,getmenu }

  function adduser() {
    return request({
    url:'/user/add'
  })
}
function getuserlist(params) {
  return request({
    url: '/user/getuserlist',
    method:'get',
    params
})
}

function getmenu(params) {
  return request({
    url: '/permission/getmenu',
    method:'post',
    data:params
})
}