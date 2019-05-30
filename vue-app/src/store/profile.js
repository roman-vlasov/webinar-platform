import axios from '../axios-instance'

// initial state
const state = {
  name: "Профиль",
  image: "https://vk.com/images/camera_200.png?ava=1",
  email: '',
  id: null,
  role: null
}

// getters
const getters = {
  userName: state => state.name,
  userImage: state => state.image,
  userEmail: state => state.email,
  userId: state => state.id,
  userRole: state => state.role,
  userIsAdmin: state => state.role === 'ADMIN'
}

// mutations
const mutations = {
  setProfile (state, profileInfo) {
    state.name = profileInfo.name
    state.id = profileInfo._id
    state.email = profileInfo.email
    state.role = profileInfo.role
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
