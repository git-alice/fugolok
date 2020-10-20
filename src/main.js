import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import router from './router'
import VuePreview from 'vue-preview'
import VueTinyLazyloadImg from 'vue-tiny-lazyload-img'
import Notifications from 'vue-notification'
import VueCookies from 'vue-cookies'
import store from './store'
import VTooltip from 'v-tooltip'
import Axios from 'axios'
import AudioVisual from 'vue-audio-visual'

Vue.use(AudioVisual)

// Axios -> prototype.$http
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

// Notifications
Vue.use(Notifications, {
  max: 1,
})

Vue.use(VTooltip)

// Theme js
// import './assets/js/pixel'

// Cookie
Vue.use(VueCookies);

// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: true,
  fullscreenEl: true,
  shareEl: false,
  tapToClose: true,
  downloadEl: true,
  tapToToggleControls: false,
  bgOpacity: 1,
  showAnimationDuration: 0,
  hideAnimationDuration: 0
})

Vue.use(VueTinyLazyloadImg);

Vue.component('vue-draggable-resizable', VueDraggableResizable)
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

export default Vue;