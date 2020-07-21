import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: localStorage.getItem('lang') || 'english', // 语言标识
	messages: {
		'zh': require('./common/zh.js'),
		'Korean': require('./common/han.js'),
		'Japanese': require('./common/ri.js'),
		'english': require('./common/eng.js'),
		'fan': require('./common/fan.js')
	}

})
export default i18n