export default {
  namespaced: true,
  state() {
    return {
      journal: [],
    }
  },
  mutations: {
    setJournal(state, journal) {
      state.journal = journal.reverse()
    },
  },

  actions: {},

  getters: {
    journal(state) {
      return state.journal
    },
  },
}
