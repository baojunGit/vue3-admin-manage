import router from './router'
// import { RouteRecordRaw } from 'vue-router'
import { useRouterStoreHook } from '@/store/modules/router'
import Cookies from 'js-cookie'
import { storeToRefs } from 'pinia'

const routerStore = useRouterStoreHook()

const { setRoutes } = routerStore

const { routes } = storeToRefs(routerStore)

// 路由白名单
const whiteList = ['/login', '/data-operation']

// 获取动态路由状态的标识，防止多次获取动态路由和栈溢出
let asyncRouterFlag: any = 0

// 注册动态路由的方法
const regRouter = async () => {
  await setRoutes()
  // 打印所有已挂载的路由
  // "for...of" 语句的左侧不能使用类型批注
  // console.log(routes.value)
  for (const item of routes.value) {
    // addRoute添加的是路由对象
    router.addRoute(item)
  }
  // addRoute里的对象要是RouteRecordRaw类型
  // routes.value.forEach((item: RouteRecordRaw) => {
  //   // addRoute添加的是路由对象
  //   router.addRoute(item)
  // })
}

router.beforeEach(async (to, from, next) => {
  // 用户登录的token, 登陆后才存在数据
  const token: string = Cookies.get('token')
  // 在白名单内的页面，任何人可以进入
  if (whiteList.includes(to.path)) {
    next()
    return
  }
  // 不在白名单中且已登录
  if (token) {
    /**
     * 确保addRoutes已完成
     * 在addRoutes()后第一次访问添加的路由会白屏，因为此时addRoutes()没有执行结束，
     * 找不到刚被添加的路由导致白屏。需要重新访问一次路由才行。
     * 如果参数to不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)
     * 直到其中的next({ ...to})能找到对应的路由为止。
     */
    if (!asyncRouterFlag) {
      asyncRouterFlag++
      await regRouter()
      next({ ...to, replace: true })
    } else {
      if (to.matched.length) next()
    }
  } else {
    next({ name: 'login' })
  }
})
