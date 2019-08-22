import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { router } from "@/router";
import store from '@/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {authHeader} from "./_helpers";
import VuetifyConfirm from 'vuetify-confirm'

Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
// axios.defaults.baseURL = 'http://3.120.96.33/';

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    if (error.response.status === 401) {
        // localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        location.reload(true);
    }

    return Promise.reject(error)
});


axios.interceptors.request.use(function (config) {
    // Add token to each request
    Object.assign(config.headers, authHeader());
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

Vue.use(VuetifyConfirm);
Vue.use(VueAxios, axios);

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
