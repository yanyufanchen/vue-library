import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import './api/index.js'
import Breadcrumb from './components/common/Breadcrumb.vue'
Vue.component('Breadcrumb', Breadcrumb)

import TreeTable from 'vue-table-with-tree-grid' //树状分支组件
Vue.component('tree-table', TreeTable)

import moment from 'moment'                  
Vue.component('moment', moment)
Vue.filter('moment', function (originVal) {
    return moment(originVal).format('YYYY-MM-DD');
})

// Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
