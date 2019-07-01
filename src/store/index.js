import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import topic from './topic'
import discount from './discount'
import event from './event'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        topic,
        discount,
        event,
    }
})
