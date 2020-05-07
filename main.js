import Vue from 'vue'
import App from './App'
import {get} from './utils/request.js'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$get = get
const app = new Vue({
    ...App
})
app.$mount()
