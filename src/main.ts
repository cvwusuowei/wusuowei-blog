//vue3框架提供的方法createApp方法,可以用来创建应用实例方法
import { createApp } from 'vue'
//引入跟组件App
import App from './App.vue'
import router from './router'
import './router/guard'

//引入主页默认样式
import '@/styles/index.scss'
import { titleChange } from "@/utils/title";
import 'normalize.css/normalize.css'
import { createPinia } from 'pinia'
import { i18n } from './locales'
import VueClickAway from 'vue3-click-away'
import lazyPlugin from 'vue3-lazy'
import { registerSvgIcon } from '@/icons'

//引入全局组件


import { registerObSkeleton } from '@/components/LoadingSkeleton'
import 'prismjs/themes/prism.css'
import 'prismjs'
import 'element-plus/theme-chalk/index.css'
import { components, plugins } from './plugins/element-plus'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/styles/my-element.scss';      //重写el-button类
import infiniteScroll from 'vue3-infinite-scroll-better'
import v3ImgPreview from 'v3-img-preview'
import 'mavon-editor/dist/css/index.css'
import api from './api/api'

import './assets/font/font.css'



    



const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
//利用createApp方法创建应用实例,且将应用实例挂载到挂载点
export const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .use(VueClickAway)
  .use(infiniteScroll)
  .use(v3ImgPreview, {})
  .use(lazyPlugin, {
    loading: require('@/assets/背景8.jpg'),
    error: require('@/assets/背景8.jpg')
  })
components.forEach((component) => {
  app.component(component.name, component)
})
plugins.forEach((plugin) => {
  app.use(plugin)
})
registerSvgIcon(app)
registerObSkeleton(app)

app.mount('#app')
titleChange();

console.log('%c 网站作者:无所为', 'color:#bada55')
console.log('%c qq:1047365005', 'color:#bada55')
api.report()
