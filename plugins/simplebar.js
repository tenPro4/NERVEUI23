import Vue from 'vue'
import SimpleBar from 'simplebar-vue'

Vue.use({
  install(Vue, options) {
    Vue.component('SimpleBar', SimpleBar)
  },
})
