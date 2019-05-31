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
    webinar: webinarInitState
}

// getters
const getters = {
    webinar: state => state.webinar
}

// mutations
const mutations = {
    setWebinar(state, webinar) {
        state.webinar = webinar
    },
    resetWebinar(state) {
        state.webinar = webinarInitState
    }
}

// actions
const actions = {
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
