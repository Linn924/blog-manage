import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './assets/css/atom-one-dark.css'

axios.defaults.baseURL='http://139.196.210.43:0926/'
// axios.defaults.baseURL='http://127.0.0.1:8888/'

axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
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


Vue.config.productionTip = false
Vue.prototype.axios = axios

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
