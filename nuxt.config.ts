// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  css: [
    '@/assets/scss/index.scss'
  ],
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
          'naive-ui',
          'vueuc',
          '@css-render/vue3-ssr',
          '@juggle/resize-observer'
        ]
        : ['@juggle/resize-observer']
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : []
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/assets/scss/variable.scss" as *;`,
        },
      },
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: 'https://www.jiafeng.fun',
        changeOrigin: true,
      },
      '/wp-content': {
        target: 'https://www.jiafeng.fun'
      }
    }
  },
  runtimeConfig: {
    public: {
      baseUrl: '/api'
    }
  }
})