import Vue from 'vue'
import VueRouter from 'vue-router'

const Main = () => import('@/views/Main')
const Login = () => import('@/views/Login')
const CategoryEdit = () => import('@/views/CategoryEdit')
const CategoryList = () => import('@/views/CategoryList')
const ItemEdit = () => import('@/views/ItemEdit')
const ItemList = () => import('@/views/ItemList')
const HeroEdit = () => import('@/views/HeroEdit')
const HeroList = () => import('@/views/HeroList')
const ArticleEdit = () => import('@/views/ArticleEdit')
const ArticleList = () => import('@/views/ArticleList')
const AdEdit = () => import('@/views/AdEdit')
const AdList = () => import('@/views/AdList')
const AdminUserEdit = () => import('@/views/AdminUserEdit')
const AdminUserList = () => import('@/views/AdminUserList')

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPublic: true } }, // 可以公开访问的
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/list', component: CategoryList },
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/items/create', component: ItemEdit },
      { path: '/items/list', component: ItemList },
      { path: '/items/edit/:id', component: ItemEdit, props: true },
      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/list', component: HeroList },
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },
      { path: '/articles/create', component: ArticleEdit },
      { path: '/articles/list', component: ArticleList },
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },
      { path: '/ads/create', component: AdEdit },
      { path: '/ads/list', component: AdList },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/ads/create', component: AdEdit },
      { path: '/ads/list', component: AdList },
      { path: '/ads/edit/:id', component: AdEdit, props: true },
      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/list', component: AdminUserList },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 客户端路由限制
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
