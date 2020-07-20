import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import router from './router'
import VuePreview from 'vue-preview'
import VueTinyLazyloadImg from 'vue-tiny-lazyload-img'
import VueKonva from 'vue-konva';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);
Vue.use(VueKonva);

// with parameters install
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})

Vue.use(VueTinyLazyloadImg);

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
