import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import moment from 'moment'
import store from './store.js'

import elemtnt from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elemtnt)
Vue.prototype.$moment = moment

// winFor对象是cefSharp暴露出来的C#对象
// if(winForm){
//   Vue.prototype.$winForm=winForm;
// }

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
