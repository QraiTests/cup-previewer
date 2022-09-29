import Vue from 'vue'
import App from './App.vue'

// SCSS Styles
import './assets/css/reset.scss'
import './assets/css/theme.scss'

Vue.config.productionTip = false

// Vue 2...
new Vue({
  render: h => h(App),
}).$mount('#app')