import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = () => import('@/views/Main')
const Home = () => import('@/views/home/Home')
const Tutorial = () => import('@/views/tutorial/Tutorial')
const Race = () => import('@/views/race/Race')
const Defail = () => import('@/views/article/Defail')
const HeroDetail = () => import('@/views/hero/HeroDetail')

const routes = [
  {
    path: '/', name: 'main', component: Main, redirect: '/home', children: [
      { path: '/home', name: 'home', component: Home },
      { path: '/tutorial', name: 'home', component: Tutorial },
      { path: '/race', name: 'home', component: Race },
      { path: '/article/:id', name: 'home', component: Defail, props: true }
    ]
  },
  { path: '/hero/:id', name: 'home', component: HeroDetail, props: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
