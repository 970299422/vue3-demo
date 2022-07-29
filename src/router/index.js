import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/home.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    // redirect: to => {
    //   // 方法接收目标路由作为参数
    //   // return 重定向的字符串路径/路径对象
    //   return { path: '/about', query: { q: to.params.searchText } }
    // },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About/about.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;
