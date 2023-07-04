import Vue from 'vue'
import vSelect from 'vue-select'

Vue.use({
  install(Vue, options) {
    Vue.component('v-select', vSelect)
  },
})
