import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// import Buefy from 'buefy';
// import 'buefy/dist/buefy.css';

// Vue.use(Buefy);

import SvgSprite from './components/SvgSprite.vue'
Vue.component('SvgSprite', SvgSprite)

import { icons, images, titles } from './resources/resources'
Vue.prototype.$icons = icons
Vue.prototype.$images = images
Vue.prototype.$titles = titles

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
