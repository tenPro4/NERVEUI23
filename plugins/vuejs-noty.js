import Vue from 'vue'
import VueNoty from 'vuejs-noty'

Vue.use(VueNoty)

export default (context, inject) => {
  inject('noty', Vue.prototype.$noty)
}
