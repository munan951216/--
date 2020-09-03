import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入拦截器
// import './assets/axios'
import "./assets/axios"
// 引入axios 
import axios from "axios"
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

// 引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 引入时间处理模块
import moment from "moment";
moment.locale("zh-cn");

// 时间过滤器
Vue.filter("dataTime", function (v) {
  const result = moment(v * 1000).format("MM月DD日 HH时mm分SS秒")
  return result
})
Vue.filter("dataTime1", function (v) {
  const result = moment(v * 1000).format("MM月DD日")
  return result
})
Vue.filter("dataTime2", function (v) {
  const result = moment(v * 1000).format("YYYY-MM-DD HH:mm")
  return result
})
Vue.filter("dataTime3", function (v) {
  const result = moment(v * 1000).format("YYYY.MM.DD HH:mm")
  return result
})
Vue.filter("dataTime5", function (v) {
  const result = moment(v * 1000).format("YYYY-MM-DD")
  return result
})
Vue.filter("dataTime4", function (v) {
  const result = moment(v * 1000).format("MM月DD日 HH:mm")
  return result
})
Vue.filter("dataTime6", function (v) {
  const result = moment(v * 1000).format("mm:ss")
  return result
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
