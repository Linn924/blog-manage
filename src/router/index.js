const Home = () => import( /* webpackChunkName: "home_welecome_blogList_NotFound" */ '../components/Home.vue')
const Welecome = () => import( /* webpackChunkName: "home_welecome_blogList_NotFound" */ '../components/Welecome.vue')
const BlogList = () => import( /* webpackChunkName: "home_welecome_blogList_NotFound" */ '../components/BlogList.vue')
const AddSort = () => import( /* webpackChunkName: "addSort_addTechnology_addBlog_NotFound" */ '../components/AddSort.vue')
const AddTechnology = () => import( /* webpackChunkName: "addSort_addTechnology_addBlog_NotFound" */ '../components/AddTechnology.vue')
const AddBlog = () => import( /* webpackChunkName: "addSort_addTechnology_addBlog_NotFound" */ '../components/AddBlog.vue')
const NotFound = () => import(/* webpackChunkName: "addSort_addTechnology_addBlog_NotFound" */'../components/NotFound.vue')

Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound },
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
  mode: 'history',
  routes
})

export default router
