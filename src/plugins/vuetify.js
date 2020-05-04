import Vue from 'vue'
import Vuetify from 'vuetify'

import en from 'vuetify/es5/locale/en'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const theme = {
  primary: '#0042B9',
  secondary: '#00CCAA',
  error: colors.red.darken4,
  info: colors.blue.base,
  success: colors.green.darken1,
  warning: colors.amber.base
}

export default new Vuetify({
  theme: {
    themes: {
      light: {
        ...theme
      },
      dark: {
        ...theme
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
