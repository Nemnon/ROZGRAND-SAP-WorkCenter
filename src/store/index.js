import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      wcGuid: new URL(window.location.href).searchParams.get('guid'),
    }
  },
  mutations: {},
  actions: {},
  getters: {
    wcGuid: (state) => state.wcGuid,
  },
  modules: {},
})
