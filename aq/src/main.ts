import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faCogs, faAdjust, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast from "vue-toastification";

library.add(faHome, faCogs, faMoon, faSun); 


import App from './App.vue'
import router from './router'

import './assets/style.css'
import 'magic.css/dist/magic.min.css'
import 'material-icons/iconfont/material-icons.css';
import 'tw-elements';
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())
app.use(Toast)
app.use(router)

app.mount('#app')
