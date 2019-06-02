import axios from '../axios-instance'

// initial state
const state = {
  name: "Профиль",
  image: "https://vk.com/images/camera_200.png?ava=1",
  email: '',
  id: null,
  role: null,
  authState: null
}

// getters
const getters = {
  userName: state => state.name,
  userImage: state => state.image,
  userEmail: state => state.email,
  userId: state => state.id,
  userRole: state => state.role,
  userIsAdmin: state => state.role === 'ADMIN',
  authState: state => state.authState
}

// mutations
const mutations = {
  setProfile (state, profileInfo) {
    state.name = profileInfo.name
    state.id = profileInfo._id
    state.email = profileInfo.email
    state.role = profileInfo.role
    state.authState = true
  },
  setAuthState(state, authState) {
    state.authState = authState
  }
}

// actions
const actions = {
  fetchCurrentUser ({ commit, state }) {
    return axios.get('/api/users/current')
      .then(function (response) {
        commit('setProfile', response.data)
        return response
      })
        .catch(() => commit('setAuthState', false))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
