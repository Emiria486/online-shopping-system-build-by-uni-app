import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import {
  $http
} from "@escook/request-miniprogram"
uni.$http = $http
// 配置请求根路径
$http.baseUrl = "https://api-ugo-web.itheima.net"
// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: "数据加载中....."
  })
   // 判断请求的是否为有权限的 API 接口
   if(options.url.indexOf('/my/')!==-1){
     // 为请求头添加身份认证字段
     options.header={
       // 字段的值可以直接从 vuex 中进行获取
        Authorization: store.state.m_user.token,
     }
   }
}
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}
uni.$showMsg = function(title = "数据加载失败", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: "none"
  })
}
// 1. 导入 store 的实例对象
import store from './store/store.js'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  // 2. 将 store 挂载到 Vue 实例上
  store,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
