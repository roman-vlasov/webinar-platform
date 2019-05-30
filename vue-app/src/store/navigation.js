import router from '../router'

// initial state
const state = {
  navbarMenuItems: [
    // {title: 'Подготовка', path: {name: 'Course'}, hideIfCurrent: true},
    {title: 'Вконтакте', externalPath: 'https://vk.com/egeenot', externalLink: true},
  ],
  navigationDrawerShow: false
}

// getters
const getters = {
  navbarMenuItems: (state, getters) => {
    return state.navbarMenuItems.map(item => {
      return {...item, path: {...item.path, params: {subject: getters.currentSubject}}}
    })
  },
  navigationDrawerShow: state => state.navigationDrawerShow
}

// mutations
const mutations = {
  setNavigationDrawerShow(state, showState) {
    state.navigationDrawerShow = showState
  },
}

// actions
const actions = {
  setNavigationDrawerShow({commit}, showState) {
    commit('setNavigationDrawerShow', showState)
  },
  switchNavigationDrawerShow({commit, getters}) {
    commit('setNavigationDrawerShow', !getters.navigationDrawerShow)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
