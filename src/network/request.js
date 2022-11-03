import axios from "axios";

export { request }

  function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout:5000
  })
  //请求拦截
  instance.interceptors.request.use(config => {
    /* console.log(config) */
    //请求拦截的作用
    //1.修改config文件，也就是axios实例内的配置文件
    //2.制作请求服务器后的加载图标，使用到这个功能（请求后，转圈图标一直转那种）
    //3.某些网络请求（比如登录(token)），必须携带一些特殊信息。有信息则继续请求，没有信息则另算

    //请求拦截一定要返回config,不然后续的操作没有config信息会直接报错
    return config
  }, err => { 
    console.log(err)
  })

  //响应拦截
  instance.interceptors.response.use(
    //响应拦截也一定要返回config,不然后续的操作没有config信息会直接报错
    res => { return res.data },
    err => { console.log(err)},
  )
  return instance(config)
}