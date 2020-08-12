import Vue from 'vue'
import Vuetify from 'vuetify'

import en from 'vuetify/es5/locale/en'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const theme = {
  primary: '#ff6600',
  secondary: '#ff9f00',
  error: colors.red.darken4,
  info: colors.blue.base,
  success: colors.green.darken1,
  warning: colors.amber.base
}

export default new Vuetify({
  theme: {
    themes: {
      light: {
        ...theme,
        background: '#f2f2f7',
        border: '#d1d1d1'
      },
      dark: {
        ...theme,
        background: '#000',
        border: '#4e4e4e'
      }
    },
    options: {
      customProperties: true,
    }
  },
  lang: {
    locales: { en },
    current: 'en'
  }
})
