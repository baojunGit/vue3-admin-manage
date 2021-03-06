import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入全局注册的组件
import { useElementPlus } from './plugins/element-plus'
import appComponent from '@/components/index'

// 引入全局配置
import { setup } from '@/utils/global'

// 引入pinia配置
import { setupStore } from '@/store'

// 与vue.config.js中的全局css配置区分，纯样式只要在公共入口导入就行
import 'normalize.css/normalize.css'
import './styles/index.scss'

// 引入全局阿里图标库
import '@/assets/font/iconfont.css'

// 国际化库i18n
import i18n from './locale'

// 引入vxe-table
import 'xe-utils'
import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'

// 引入权限配置
import './permission'

// vxe-table 解决 tooltip 被弹出框遮挡
VxeTable.setup({
  // version: 0,
  zIndex: 9999
  // table: {
  //   autoResize: true
  // }
})

// import命令会被 JavaScript 引擎静态分析，不能放在代码块里（if代码中）
// import()函数支持动态加载模块和按条件导入，可以放在代码块里（if代码中）
// 至于true为什么要加引号，大家体验一下不加的情况就能明白了，.env.development文件中的value都自动加了引号。
// console.log(process.env.VUE_APP_MOCK,typeof process.env.VUE_APP_MOCK)
process.env.VUE_APP_MOCK === 'true' && import('./mock')

const app = createApp(App)

setup(app)
setupStore(app)

app
  .use(useElementPlus)
  .use(appComponent)
  .use(i18n)
  .use(router)
  .use(VxeTable)
  .mount('#app')
