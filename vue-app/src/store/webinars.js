import axios from '../axios-instance'
import router from "../router";

const webinarInitState = {
    title: '',
    description: '',
    image: '',
    url: ''
}

// initial state
const state = {
    webinar: webinarInitState,
    webinars: []
}

// getters
const getters = {
    webinar: state => state.webinar,
    webinars: state => state.webinars
}

// mutations
const mutations = {
    setWebinar(state, webinar) {
        state.webinar = webinar
    },
    resetWebinar(state) {
        state.webinar = webinarInitState
    },
    setWebinars(state, webinars) {
        state.webinars = webinars
    },
    resetWebinars(state) {
        state.webinars = []
    }
}

// actions
const actions = {
    fetchWebinars({commit}) {
        commit('resetWebinars')
        return axios.get('/api/webinars')
            .then(response => {
                commit('setWebinars', response.data)
                return response
            })
    },
    fetchWebinar({commit}, webinarId) {
        commit('resetWebinar')
        return axios.get(`/api/webinars/${webinarId}`)
            .then(response => {
                commit('setWebinar', response.data)
                return response
            })
    },
    resetWebinar({commit}) {
        commit('resetWebinar')
    },
    saveWebinar(_, payload) {
        if (payload.webinarId !== null) {
            return axios.put(`/api/webinars/${payload.webinarId}`, payload.webinar)
        } else {
            return axios.post('/api/webinars', payload.webinar)
        }
    },
    goToEditWebinarPage(_, webinar) {
        router.push({ name: 'WebinarEditPage', params: { webinarId: webinar._id } })
    },
    goToWebinarPage(_, webinar) {
        router.push({ name: 'WebinarPage', params: { webinarId: webinar._id }})
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
