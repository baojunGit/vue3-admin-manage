<template>
  <div class="app-nav">
    <el-row :gutter="15">
      <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="2">
        <div class="left-panel">
          <Hamburger></Hamburger>
          <Breadcrumb></Breadcrumb>
        </div>
      </el-col>
      <el-col :xl="12" :lg="12" :md="12" :sm="12" :xs="22">
        <div class="right-panel">
          <!-- 通知 -->
          <MyNotice />
          <!-- 全屏 -->
          <MyScreenFull />
          <!-- 国际化 -->
          <div id="international" class="international">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i style="font-size: 20px" class="iconfont icon-wenzi"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="item in languages"
                    :key="item.value"
                    :disabled="lang === item.value"
                  >
                    <span @click="handleLang(item.value)">{{ item.name }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <!-- 主题配置 -->
          <MyTheme />
          <!-- 页面刷新 -->
          <PageRefresh />
          <!-- 头像模块 -->
          <MyAvatar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import { useSettingStore } from '@/store/modules/setting'
import {
  Hamburger,
  Breadcrumb,
  MyNotice,
  PageRefresh,
  MyAvatar,
  MyTheme
} from './components'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'

interface Language {
  name: string
  value: string
}

const { locale } = useI18n()

// zh or en
// console.log(locale.value)
const settingStore = useSettingStore()
const { toggleLang } = settingStore
const { lang } = storeToRefs(settingStore)

const state = reactive({
  languages: [
    { name: 'English', value: 'en' },
    { name: '中文', value: 'zh' }
  ] as Array<Language>,
  handleLang: (lang: string) => {
    locale.value = lang
    toggleLang(lang)
  }
})

const { languages, handleLang } = toRefs(state)
</script>

<style scoped></style>
