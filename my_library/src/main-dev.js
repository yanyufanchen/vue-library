import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

import './api/index.js'
import Breadcrumb from './components/common/Breadcrumb.vue'
Vue.component('Breadcrumb', Breadcrumb)

import TreeTable from 'vue-table-with-tree-grid' //树状分支组件
Vue.component('tree-table', TreeTable)


// Vue.filter('dateFormat', function (originVal) { //时间格式化
//   const dt = new Date(originVal)

//   const y = dt.getFullYear()
//   const m = (dt.getMonth() + 1 + '').padStart(2, '0')
//   const d = (dt.getDate() + '').padStart(2, '0')

//   const hh = (dt.getHours() + '').padStart(2, '0')
//   const mm = (dt.getMinutes() + '').padStart(2, '0')
//   const ss = (dt.getSeconds() + '').padStart(2, '0')

//   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
// })
import moment from 'moment'
Vue.component('moment', moment)
Vue.filter('moment', function (originVal) {
    return moment(originVal).format('YYYY-MM-DD');
})

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
