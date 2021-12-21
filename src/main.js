import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import http from 'axios'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

// if (process.env.NODE_ENV === 'development') require('@/api/mock')
require('@/api/mock')

Vue.prototype.$http = http;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
