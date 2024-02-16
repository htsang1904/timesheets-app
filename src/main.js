import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import '@/assets/buefy.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/vi'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(ElementUI, { locale });
Vue.use(Buefy)
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyD7OTe2Zz3kpGuqWtB-vPHnWsHUA1c0hVM",
    libraries: "places"
  }
});
new Vue({
  render: h => h(App),
}).$mount('#app')
