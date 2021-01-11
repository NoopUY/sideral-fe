export const stat = () => ({
  user: null
})

export const mutations = {
  session: (state, user) => { state.user = user }
}

export const actions = {

  async me ({ commit }) {
    const data = { username: 'dani', first_name: 'Daniel', last_name: 'Waksman' } // TODO: Get data from API
    commit('session', data)
  },

  async 'sign-in' ({ dispatch }, { email, password }) {
    // TODO: Signin through API
    dispatch('me')
    return true
  },

  async 'sign-out' ({ commit }) {
    commit('session', null)
  }
}
