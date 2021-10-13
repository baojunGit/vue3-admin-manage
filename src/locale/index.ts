// 多组件库的国际化和本地项目国际化兼容
import { createI18n } from 'vue-i18n'
import { localesConfigs } from './config'
import { handleLocal } from '@/utils/storage'

export const getLang = () => {
  let lang = handleLocal.get('lang')
  if (lang) {
    return lang
  }
  lang = navigator.language.toLowerCase()
  // Object.keys()返回对象的所有可枚举属性的字符串数组
  // ['zh-cn','en']
  const locales = Object.keys(localesConfigs)
  for (const locale of locales) {
    if (lang.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'zh'
}

const i18n = createI18n({
  locale: getLang(), // zh 还是 en
  messages: localesConfigs
})

export default i18n
