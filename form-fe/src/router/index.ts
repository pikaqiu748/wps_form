import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useFormStore } from '@/store/index'

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 设置全局前置导航
Router.beforeEach((to, from, next) => {
  const store = useFormStore()
  const uName = store.account
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (uName === '') {
      document.title = to.meta.title as string
      next('/')
    } else {
      document.title = to.meta.title as string
      next()
    }
  } else {
    if (to.meta.title) {
      document.title = to.meta.title as string
    }
    next()
  }
})

// 登录之前做一个判断 ,判断它进入其它页面有没有先登录,
// Router.beforeEach((to, from, next) => {
//   // 判断有没有登录
//   const isLogin = localStorage.wxToken ? true : false
//   // 如果当前访问的是登录页面或者注册页面可以让它进入
//   if (to.path == '/login' || to.path == '/register') {
//     next()
//   } else {
//     // 如果isLogin为true表示已经登录了;就让它正常进入就可以 ,如果没登录就让他进入登录页面
//     isLogin ? next() : next('/')
//   }
// })

export default Router
