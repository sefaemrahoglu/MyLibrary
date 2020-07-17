import Vue from 'vue'
import App from './App.vue'
import { router } from "./router";
import { store } from "./store/store";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
