import Vue from 'vue'
import App from './App'
import {
	get,
	cloud
} from './utils/request.js'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$get = get
Vue.prototype.$cloud = cloud
const app = new Vue({
	...App
})
app.$mount()
