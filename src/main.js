import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var timeCalculator = new Vue({
  render: h => h(App),
}).$mount('#app');
