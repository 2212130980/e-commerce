// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import {Alert, MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
var axios = require('axios')
axios.defaults.baseURL = 'http://172.20.10.2:8888'

// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.interceptors.request.use(config => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';       
    let token = sessionStorage.getItem('token')
    if (token) {
      config.headers.common['Authentication-Token'] = token;
      config.headers.common['Authentication-userId'] = sessionStorage.getItem('id');
    }
    return config
  },
  err => {
    return Promise.reject(err);
  }
)
axios.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.code !== 0) {
      // 401:未登录;
      if (res.code === 401) {
        MessageBox.confirm('您没有登陆o', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          router.push({path:'/login'})
          // store.dispatch('FedLogOut').then(() => {
          // router.push({name: '/login'})
          // location.reload()// 为了重新实例化vue-router对象 避免bug
          // })
        }).catch(()=>{
          router.push({path:'/login'})
        })
      }
      if (res.code === 402) {
        MessageBox.confirm('您的账户被禁用', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          router.push({path:'/login'})
          // store.dispatch('FedLogOut').then(() => {
          // router.push({name: '/login'})
          // location.reload()// 为了重新实例化vue-router对象 避免bug
          // })
        }).catch(()=>{
          router.push({path:'/login'})
        })
      }
      if (res.code === 403) {
        MessageBox.confirm('您的登陆有效期到了', '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          router.push({path:'/login'})
          // store.dispatch('FedLogOut').then(() => {
          // router.push({name: '/login'})
          // location.reload()// 为了重新实例化vue-router对象 避免bug
          // })
        }).catch(()=>{
          router.push({path:'/login'})
        })
      }
    }
    return response
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)
router.beforeEach((to, from, next) => {
  if (!sessionStorage.getItem("isLogin")&&to.path=="/item"){
    next({path:'/login'})
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
