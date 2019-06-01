import Vue from 'vue'
import Vuex from 'vuex'

import Navigation from './store/navigation'
import UserProfile from './store/profile'
import Webinars from './store/webinars'
import Polls from './store/polls'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        Navigation,
        UserProfile,
        Webinars,
        Polls
    },
    strict: debug
})
