import { defineStore } from 'pinia'
import { i18n } from '@/locales/index'
import cookies from 'js-cookie'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  parent: '#loading-bar-wrapper'
})
//设置主题
const setTheme = (theme: string) => {
  //日间主题
  if (theme === 'theme-dark') {
    document.body.classList.remove('theme-light')
    document.body.classList.add('theme-dark')
  } else {
    //夜间主题
    document.body.classList.remove('theme-dark')
    document.body.classList.add('theme-light')
  }
}

export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      //主题定制
      themeConfig: {
        theme: cookies.get('theme') ? String(cookies.get('theme')) : 'theme-dark',
        profile_shape: 'circle-avatar',
        feature: true,
        gradient: {
          color_1: '#61ffb0',
          color_2: '#4ac7fd',
          color_3: '#efa1f0'
        },
        header_gradient_css: 'linear-gradient(130deg, #61ffb0, #4ac7fd 41.07%, #efa1f0 76.05%)',
        background_gradient_style: {
          background: 'linear-gradient(130deg, #61ffb0, #4ac7fd 41.07%, #efa1f0 76.05%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          '-webkit-box-decoration-break': 'clone',
          'box-decoration-break': 'clone'
        }
      },
      appLoading: false,
      websiteConfig: '' as any,
      viewCount: 0,
      articleCount: 0,
      talkCount: 0,
      categoryCount: 0,
      tagCount: 0,
      NPTimeout: -1,
      loadingTimeout: -1,
      aurora_bot_enable: true
    }
  },
  actions: {
    changeLocale(locale: string) {
      cookies.set('locale', locale, { expires: 7 })
      i18n.global.locale = locale
    },
    initializeTheme(mode: string) {
      setTheme(mode)
    },
    toggleTheme(isDark?: boolean) {
      this.themeConfig.theme =
        isDark === true || this.themeConfig.theme === 'theme-light' ? 'theme-dark' : 'theme-light'
      cookies.set('theme', this.themeConfig.theme, { expires: 7 })
      setTheme(this.themeConfig.theme)
    },
    startLoading() {
      if (this.appLoading === true) return
      if (this.NPTimeout !== -1) clearTimeout(this.NPTimeout)
      if (this.loadingTimeout !== -1) clearTimeout(this.loadingTimeout)
      nProgress.start()
      this.appLoading = true
    },
    endLoading() {
      this.NPTimeout = <any>setTimeout(() => {
        nProgress.done()
      }, 100)

      this.loadingTimeout = <any>setTimeout(() => {
        this.appLoading = false
      }, 300)
    }
  }
})
