const Home = () => import( /* webpackChunkName: "home_welecome_notfound" */ '../components/Home.vue')
const Welecome = () => import( /* webpackChunkName: "home_welecome_notfound" */ '../components/dynamic/Welecome.vue')
const NotFound = () => import(/* webpackChunkName: "home_welecome_notfound" */'../components/dynamic/NotFound.vue')

const Login = () => import( /* webpackChunkName: "login" */ '../components/dynamic/Login.vue')
const BlogList = () => import( /* webpackChunkName: "bloglist_addblog" */ '../components/dynamic/BlogList.vue')
const AddBlog = () => import( /* webpackChunkName: "bloglist_addblog" */ '../components/dynamic/AddBlog.vue')
const SortList = () => import( /* webpackChunkName: "sortlist" */ '../components/dynamic/SortList.vue')
const LabelList = () => import( /* webpackChunkName: "labellist" */ '../components/dynamic/LabelList.vue')
const CommentList = () => import( /* webpackChunkName: "commentlist" */ '../components/dynamic/CommentList.vue')
const UserList = () => import( /* webpackChunkName: "userlist" */ '../components/dynamic/UserList.vue')



Vue.use(VueRouter)

const routes = [
  { path: '*', component: NotFound },
  { path: '/', redirect: '/login' },
  { path : '/login',component: Login},
  {
    path: '/home', 
    component: Home,
    redirect: '/welecome',
    children: [
      {path : '/welecome',component:Welecome},
      {path : '/blogs',component:BlogList},
      {path : '/sorts',component:SortList},
      {path : '/labels',component:LabelList},
      {path : '/comments',component:CommentList},
      {path : '/users',component:UserList},
      {path : '/addblog',component:AddBlog}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(sessionStorage.getItem('token') || to.path === '/login'){
    next()
  }else{
    next('/login')
  }
})

export default router
