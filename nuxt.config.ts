// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,
  app: {
    baseURL: '/the-card-club/',
    head: {
      htmlAttrs: {
        lang: 'it',
      },
    },
  },

  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxtjs/tailwindcss'],

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  compatibilityDate: '2024-04-03',
});
