import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/index.esm'
import '../assets/scss/style.scss'
import App from "../App.vue"
import {router} from './router.js'

const app = createApp(App);
app.use(router);
app.mount("#app");