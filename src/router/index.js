const Home = () => import( /* webpackChunkName: "home_welecome_notfound" */ '../components/Home.vue')
const Welecome = () => import( /* webpackChunkName: "home_welecome_notfound" */ '../components/Welecome.vue')
const NotFound = () => import(/* webpackChunkName: "home_welecome_notfound" */'../components/NotFound.vue')

const Login = () => import( /* webpackChunkName: "login" */ '../components/Login.vue')
const BlogList = () => import( /* webpackChunkName: "bloglist_addblog" */ '../components/BlogList.vue')
const AddBlog = () => import( /* webpackChunkName: "bloglist_addblog" */ '../components/AddBlog.vue')
const SortList = () => import( /* webpackChunkName: "sortlist" */ '../components/SortList.vue')
const LabelList = () => import( /* webpackChunkName: "labellist" */ '../components/LabelList.vue')
const CommentList = () => import( /* webpackChunkName: "commentlist" */ '../components/CommentList.vue')
const UserList = () => import( /* webpackChunkName: "userlist" */ '../components/UserList.vue')



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
