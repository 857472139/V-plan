import Vue from 'vue'
import App from './App'
import all from './web3Prox.js'
Vue.prototype.web3 =all.Web3
Vue.prototype.Contract = all.Contract
import topheader from '@/components/topheader.vue'
import subtitle from '@/components/subtitle.vue'
Vue.component('topheader',topheader)
Vue.component('subtitle',subtitle)
Vue.config.productionTip = false

App.mpType = 'app'
import i18n from 'lang.js'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
const app = new Vue({
    ...App,
	i18n
})
app.$mount()
