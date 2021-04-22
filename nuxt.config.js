import colors from "vuetify/es5/util/colors";

export default {
  router: {
    middleware: "meta"
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - sudoku",
    title: "sudoku",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/global/no-scrollbar.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/device",
    "nuxt-use-sound"
  ],

  device: {
    refreshOnResize: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/dotenv",
    [
      "nuxt-vuex-localstorage",
      {
        localStorage: ["battles-complete", "settings", "playground"],
        sessionStorage: ["system"]
      }
    ],
    [
      "nuxt-i18n",
      {
        lazy: true,
        locales: [
          { code: "en", iso: "en-US", file: "en.json" },
          { code: "vi", iso: "vi-VN", file: "vi.json" }
        ],
        langDir: "i18n/",
        defaultLocale: "en"
      }
    ]
  ],

  sound: {
    button: {
      src: "/sounds/sound_button.ogg",
      options: {
        volume: 0.5
      }
    },
    edit_note: {
      src: "/sounds/sound_edit_note.ogg",
      options: {
        volume: 0.5
      }
    },
    edit_value: {
      src: "/sounds/sound_edit_value.ogg",
      options: {
        volume: 0.5
      }
    },
    erase: {
      src: "/sounds/sound_erase.ogg",
      options: {
        volume: 0.5
      }
    },
    error: {
      src: "/sounds/sound_error.ogg",
      options: {
        volume: 0.5
      }
    },
    hint: {
      src: "/sounds/sound_hint.ogg",
      options: {
        volume: 0.5
      }
    },

    pencil_off: {
      src: "/sounds/pencil_off.ogg",
      options: {
        volume: 0.5
      }
    },
    pencil_on: {
      src: "/sounds/pencil_on.ogg",
      options: {
        volume: 0.5
      }
    },

    undo: {
      src: "/sounds/undo.ogg",
      options: {
        volume: 0.5
      }
    },

    win: {
      src: "/sounds/win.ogg",
      options: {
        volume: 0.5
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          lighten: "#f8f9fd",
          secondary: "#757575",
          bluedark: "#344860",
          appbar: "#f5f5f5"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: ["@babel/plugin-proposal-optional-chaining"]
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      });
    }
  }
};
