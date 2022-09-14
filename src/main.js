import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
// import "./plugins/element-ui"
import VueRouter from 'vue-router'
// 引入element-ui样式
import {validateRules} from  './mixin/validateRule'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入全局过滤器
import './utils/filters'
Vue.use(ElementUI);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload) 

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.mixin(validateRules);

const vm = new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
}).$mount('#app')

export {vm};
