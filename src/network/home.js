import { request } from './request'

export { gethomedata }

  function gethomedata() {
    return request({
    url:'/home/getData'
  })
}
