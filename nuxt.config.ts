import {defineNuxtConfig, NuxtConfig} from 'nuxt/config';

const nuxtConfig: NuxtConfig = defineNuxtConfig({
  app: {
    head: {
      title: 'Q&A system',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'none' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ],
      script: [
        {
          src:
            'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js'
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiKey: process.env.NUXT_API_KEY,
      authDomain: process.env.NUXT_AUTH_DOMAIN,
      databaseURL: process.env.NUXT_DATABASE_URL,
      projectId: process.env.NUXT_PROJECT_ID,
      storageBucket: process.env.NUXT_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_APP_ID
    }
  },
  srcDir: 'src',
  css: [
    '~/css/global.css'
  ],
  modules: [
    '@pinia/nuxt'
  ]
});

export default nuxtConfig;
