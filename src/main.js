import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './assets/css/atom-one-dark.css'

//配置请求的根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8888/'
axios.defaults.baseURL='http://139.196.210.43:0924/'

//axios请求拦截器 在请求有权限的接口时 必须在请求头里面设置一个字段Authorization 此字段的值必须等于token的值
axios.interceptors.request.use(config => {
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须return config
  return config
})

axios.interceptors.response.use(config => {
  return config
})

//自定义代码高亮事件
Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

//处理时间格式的过滤器
Vue.filter('date', function (originVal) {
  const t = new Date(originVal)
  const y = t.getFullYear()
  const m = (t.getMonth() + 1 + '').padStart(2, '0')
  const d = (t.getDate() + '').padStart(2, '0')
  const hh = (t.getHours() + '').padStart(2, '0')
  const mm = (t.getMinutes() + '').padStart(2, '0')
  const ss = (t.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false
Vue.prototype.$http = axios



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
