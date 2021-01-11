export const actions = {
  nuxtServerInit ({ dispatch }) {
    try {
      dispatch('session/me')
    } catch (err) {
      console.log(err)
    }
  }
}
