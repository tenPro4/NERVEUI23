import countTo from 'vue-count-to'
import Vue from 'vue'

Vue.use({
  install(Vue, options) {
    Vue.component('CountTo', countTo)
  },
})
