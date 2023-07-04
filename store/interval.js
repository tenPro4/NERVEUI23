export const state = () => ({
  ids: [],
})

export const mutations = {
  add(state, val) {
    state.ids = [...state.ids, val]
  },
  clear(state) {
    state.ids = []
  },
}

export const actions = {
  add({ commit }, payload) {
    const id = setInterval(payload, 3000)
    commit('add', id)
  },
  clear({ commit, state }) {
    for (const id of state.ids) {
      clearInterval(id)
    }
    commit('clear')
  },
}
