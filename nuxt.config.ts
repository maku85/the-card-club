// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // app: {
  //   baseURL: "/the-card-club/",
  // },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxtjs/tailwindcss'],
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
});
