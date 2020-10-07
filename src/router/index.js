const Home = () => import( /* webpackChunkName: "home_welecome_blogList" */ '../components/Home.vue')
const Welecome = () => import( /* webpackChunkName: "home_welecome_blogList" */ '../components/Welecome.vue')
const BlogList = () => import( /* webpackChunkName: "home_welecome_blogList" */ '../components/BlogList.vue')
const AddSort = () => import( /* webpackChunkName: "addSort_addTechnology_addBlog" */ '../components/AddSort.vue')
const AddTechnology = () => import( /* webpackChunkName: "addSort_addTechnology_addBlog" */ '../components/AddTechnology.vue')
const AddBlog = () => import( /* webpackChunkName: "addSort_addTechnology_addBlog" */ '../components/AddBlog.vue')

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
