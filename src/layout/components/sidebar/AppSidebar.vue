<template>
  <div class="app-sidebar">
    <Logo></Logo>
    <!-- wrap-class 包裹层自定义样式类 -->
    <el-scrollbar wrap-class="scroll-wrapper">
      <!-- unique-opened有且只能展开一个 -->
      <!-- :collapse="isCollapse" 是否收缩侧边菜单-->
      <!-- :collapse-transition=false解决折叠卡顿不流畅 -->
      <!-- router 会默认匹配路由，执行激活菜单回调 -->
      <el-menu
        :default-active="activeMenu"
        unique-opened
        :text-color="variables['menu-color']"
        :active-text-color="variables['menu-color-active']"
        :background-color="variables['menu-background']"
        mode="vertical"
        :collapse="!opened"
        :collapse-transition="false"
        @select="selectMenuItem"
      >
        <!-- v-for和v-if不能用在同一个标签上 -->
        <template v-for="item in menuList" :key="item?.id">
          <MenuItem v-if="!item?.meta?.hideInMenu" :menu-item="item"></MenuItem>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingStore } from '@/store/modules/setting'
import { useRouterStore } from '@/store/modules/router'
import { storeToRefs } from 'pinia'
import MenuItem from './components/MenuItem.vue'
import Logo from './components/Logo.vue'
import variables from '@/styles/theme/export.module.scss'

const route = useRoute()
const router = useRouter()
const settingStore = useSettingStore()
const routerStore = useRouterStore()
const { opened } = storeToRefs(settingStore)
const { getSideMenu: menuList } = storeToRefs(routerStore)
// console.log(menuList)
// el-menu菜单激活回调
// index: 选中菜单项的 index, indexPath: 选中菜单项的 index集合, el: 选中路由对象信息,
// el: vue-router 的返回值（如果 router 为 true）
const selectMenuItem = (index, indexPath, el) => {
  // 传参的键和值
  const query = {}
  const params = {}
  // el &&el.route &&el.route.parameters 用可选链写法代替
  // 这里不能使用for of，会报错&&右边应该为表达式
  el?.route?.parameters &&
    el.route.parameters.forEach(item => {
      if (item.type === 'query') {
        query[item.key] = item.value
        return // 跳出本次循环
      }
      params[item.key] = item.value
    })
  // for(const {type,key,value} of el.route.parameters){
  //     if(type === 'query') {
  //       query[key] = value
  //       continue
  //     }
  //       params[key] = value
  //     }
  //   }
  if (index === route.name) return
  // 判断是否网址链接，如果是就打开新窗口
  if (/http(s)?:/.test(index)) {
    window.open(index)
    // 不是就跳转到固定的路由
  } else {
    router.push({ name: index, query, params })
  }
}

// el-menu路由匹配方法
const activeMenu = computed((): string => {
  const { meta, name } = route
  // 可以在meta里添加信息，重置高亮的路由，比如要让父路由高亮
  if (meta.activeMenu) {
    // @ts-ignore 注释掉 不能将类型“unknown”分配给类型“string”。
    return meta.activeMenu
  }
  // @ts-ignore 不能将类型“RouteRecordName”分配给类型“string”。
  return name
})
</script>
