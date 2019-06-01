import axios from '../axios-instance'
import router from "../router";

// initial state
const state = {
    polls: []
}

// getters
const getters = {
    polls: state => state.polls
}

// mutations
const mutations = {
    setPolls(state, polls) {
        state.polls = polls
    },
    resetPolls(state) {
        state.polls = []
    }
}

// actions
const actions = {
    fetchPolls({commit}, webinarId) {
        commit('resetPolls')
        return axios.get(`/api/webinars/${webinarId}/polls`)
            .then(response => {
                commit('setPolls', response.data)
                return response
            })
    },
    // fetchWebinar({commit}, webinarId) {
    //     commit('resetWebinar')
    //     return axios.get(`/api/webinars/${webinarId}`)
    //         .then(response => {
    //             commit('setWebinar', response.data)
    //             return response
    //         })
    // },
    // resetWebinar({commit}) {
    //     commit('resetWebinar')
    // },
    // saveWebinar(_, payload) {
    //     if (payload.webinarId !== null) {
    //         return axios.put(`/api/webinars/${payload.webinarId}`, payload.webinar)
    //     } else {
    //         return axios.post('/api/webinars', payload.webinar)
    //     }
    // },
    // goToEditWebinarPage(_, webinar) {
    //     router.push({ name: 'WebinarEditPage', params: { webinarId: webinar._id } })
    // },
    // goToWebinarPage(_, webinar) {
    //     router.push({ name: 'WebinarPage', params: { webinarId: webinar._id }})
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
