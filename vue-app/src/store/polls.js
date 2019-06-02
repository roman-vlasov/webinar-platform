import axios from '../axios-instance'
import router from "../router";

// initial state
const state = {
    polls: [],
    poll: null
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
    },
    setPoll(state, poll) {
        state.poll = poll
    },
    resetPoll(state) {
        state.poll = null
    }
}

// actions
const actions = {
    fetchPolls({commit}, webinarId) {
        commit('resetPolls')
        console.log("start")
        return axios.get(`/api/webinars/${webinarId}/polls`)
            .then(response => {
                commit('setPolls', response.data)
                console.log(response.data)
                return response
            })
    },
    fetchPoll({commit}, { webinarId, pollId }) {
        commit('resetPoll')
        return axios.get(`/api/webinars/${webinarId}/polls/${pollId}`)
            .then(response => {
                commit('setPoll', response.data)
                return response
            })
    },
    resetPoll({commit}) {
        commit('resetPoll')
    },
    savePoll(_, { webinarId, pollId, poll }) {
        if (pollId !== null) {
            return axios.put(`/api/webinars/${webinarId}/polls/${pollId}`, poll)
        } else {
            return axios.post(`/api/webinars/${webinarId}/polls`, poll)
        }
    },
    deletePoll({dispatch}, poll) {
        const webinarId = poll.webinarId
        return axios.delete(`/api/webinars/${poll.webinarId}/polls/${poll._id}`)
            .then((response) => {
                dispatch('fetchPolls', webinarId)
                return response
            })
    },
    goToEditPollPage(_, poll) {
        router.push({ name: 'PollEditPage', params: { webinarId: poll.webinarId, pollId: poll._id } })
    },
    goToCreatePollPage(_, webinar) {
        router.push({ name: 'PollNewPage', params: { webinarId:webinar._id } })
    },
    switchPollState(_, { poll, socket }) {
        if (poll.state === 'NOT_STARTED') {
            socket.emit('start_poll', {pollId: poll._id});
        } else if (poll.state === 'ONLINE') {
            socket.emit('finish_poll', {pollId: poll._id});
        }
    },
    sendAnswers(_, { poll, selectedAnswers }) {
        return axios.post(`/api/webinars/${poll.webinarId}/polls/${poll._id}/answers`, { selectedAnswers, pollId: poll._id })
            .then(response => response.data.right)
    }
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
