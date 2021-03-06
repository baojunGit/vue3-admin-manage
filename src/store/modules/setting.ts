import { defineStore } from 'pinia'
import { handleLocal, handleSession } from '@/utils/storage'
import { getLang } from '@/locale'
import theme from '@/config'
import { themeModels } from '@/utils/theme'

type ModelType =
  | 'light'
  | 'dark'
  | 'blueBlack'
  | 'blueWhite'
  | 'greenBlack'
  | 'greenWhite'
  | 'purpleWhite'
  | 'purpleBlack'
  | string

type BackgroundType =
  /**
   * 无背景
   */
  | 'none'
  /**
   * 自定义背景
   */
  | 'image'
  | string

interface ThemeType {
  // 主题模式
  model: ModelType
  background: BackgroundType
}

const defaultTheme: ThemeType = {
  model: theme.model,
  background: theme.background
}

interface SettingType {
  opened: boolean
  lang: string
  driverState: boolean
  mobile: boolean
  theme: ThemeType
}

export const useSettingStore = defineStore('setting', {
  state: (): SettingType => ({
    // ES6 引入了一个新的 空值合并操作符??
    // 当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数
    opened: handleLocal.get('sidebarStatus') ?? true,
    lang: getLang(), // 默认采用的国际化方案,初次进入，采用浏览器当前设置的语言，默认采用中文
    driverState: handleSession.get('driverState') ?? true, // 是否引导
    mobile: false,
    theme: handleLocal.get('theme') || { ...defaultTheme }
  }),
  getters: {},
  actions: {
    /**
     * @description 侧边栏切换伸缩状态
     */
    toggleSidebar() {
      // console.log('执行mutations切换侧边栏')
      this.opened = !this.opened
      // state.sidebar.withoutAnimation = false
      handleLocal.set('sidebarStatus', this.opened)
      // console.log(this.opened)
    },
    /**
     * @descript 切换语言类型
     * @param { string } lang 语言类型
     */
    toggleLang(lang) {
      this.lang = lang
      handleLocal.set('lang', lang)
    },
    /**
     * @description 关闭引导状态
     */
    closeIntro() {
      this.driverState = false
      handleSession.set('driverState', false)
    },
    /**
     * @description 判断是否移动端
     */
    toggleMobile(mobile) {
      this.mobile = mobile
    },
    updateTheme() {
      if (this.theme.background === 'app-image') {
        document.getElementsByTagName('body')[0].classList.add('app-image')
      } else {
        document.getElementsByTagName('body')[0].classList.remove('app-image')
      }
      const modelObj = themeModels[this.theme.model]
      handleLocal.set('theme', this.theme)
      // 设置css 变量
      Object.keys(modelObj).map(item => {
        document.documentElement.style.setProperty(item, modelObj[item])
        // 数组方法没有return eslint会警告
        return true
      })
    }
  }
})
