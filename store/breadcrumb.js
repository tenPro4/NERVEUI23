export const state = () => ({
  title: '',
  items: [],
})

export const mutations = {
  setTitle(state, value) {
    state.title = value
  },
  setItems(state, value) {
    state.items = value
  },
}

export const actions = {
  setTitle({ commit }, value) {
    commit('setTitle', value)
  },
  setItems({ commit }, value) {
    commit('setItems', value)
  },
}
