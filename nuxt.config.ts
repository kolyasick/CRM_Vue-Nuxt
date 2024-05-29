// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
    modules: [
        '@nuxt/ui',
        '@nuxt/image',
        'shadcn-nuxt',
        'nuxt-icon',
        '@nuxtjs/i18n',
        '@pinia/nuxt',
        [
            '@vee-validate/nuxt',
            {
                autoImports: true,
            },
        ],
        ['@nuxtjs/google-fonts', {
            families: {
                Lato: {
                    wght: [300, 400, 700],
                    ital: [300]
                }
            }
        }],
    ],
    shadcn: {
        prefix: 'Ui',
        componentDir: './components/ui'
    },

    i18n: {
        langDir: 'i18n',
        defaultLocale: 'en',
        trailingSlash: true,
        detectBrowserLanguage: false,
        locales: [
            { code: 'en', file: 'en.json', name: 'Eng' },
            { code: 'uk', file: 'uk.json', name: 'Укр' },
        ],
        compilation: {
            strictMessage: false,
        },
    },
    pinia: {
      storesDirs: ['./store/**']
    },
    plugins: ['@/plugins/chart.js'],
    target: 'static', // default is 'server'
    router: {
      base: ''
    },
    generate: {
      fallback: true
    },
  head: {
    link: [
      { rel: 'preload', href: '/_payload.json', as: 'fetch', type: 'application/json', crossorigin: 'use-credentials' }
    ]
  }
})

