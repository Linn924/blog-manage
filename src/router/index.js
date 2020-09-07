import Home from '../components/Home.vue'
import Welecome from '../components/Welecome.vue'
import BlogList from '../components/BlogList.vue'
import AddSort from '../components/AddSort.vue'
import AddTechnology from '../components/AddTechnology.vue'
import AddBlog from '../components/AddBlog.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home', component: Home, redirect: '/welecome',
    children: [
      {path : '/welecome',component: Welecome},
      {path : '/blogList',component:BlogList},
      {path : '/addsort',component:AddSort},
      {path : '/addtechnology',component:AddTechnology},
      {path : '/addblog',component:AddBlog}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
