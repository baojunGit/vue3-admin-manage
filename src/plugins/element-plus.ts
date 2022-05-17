import { App } from 'vue'
import {
  ElAffix,
  ElSkeleton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElSpace,
  ElDivider,
  ElCard,
  ElDropdown,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElLoading,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElPagination,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElCheckboxGroup,
  ElBadge,
  ElAvatar,
  ElImage,
  ElTimeline,
  ElTimelineItem,
  ElDatePicker,
  ElTag,
  ElConfigProvider,
  ElSelect,
  ElOption,
  ElTree,
  ElRadioGroup,
  ElRadio,
  ElSwitch,
  ElInputNumber,
  ElColorPicker
} from 'element-plus'
// 引入element样式
import 'element-plus/dist/index.css'

const components = [
  ElAffix,
  ElSkeleton,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElSpace,
  ElDivider,
  ElCard,
  ElDropdown,
  ElDialog,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElForm,
  ElFormItem,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElPagination,
  ElAlert,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElCheckboxGroup,
  ElBadge,
  ElAvatar,
  ElImage,
  ElTimeline,
  ElTimelineItem,
  ElDatePicker,
  ElTag,
  ElConfigProvider,
  ElSelect,
  ElOption,
  ElTree,
  ElRadioGroup,
  ElRadio,
  ElSwitch,
  ElInputNumber,
  ElColorPicker
]

const plugins = [ElLoading]

export function useElementPlus(app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
  for (const plugin of plugins) {
    app.use(plugin)
  }
}
