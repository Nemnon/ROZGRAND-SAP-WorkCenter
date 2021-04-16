import moment from 'moment'

export default {
  namespaced: true,
  state() {
    return {
      startTime: new Date(),
      endTime: new Date(),
      currentTime: '',
    }
  },
  mutations: {
    setStartTime(state, time) {
      state.startTime = new Date(time)
    },
    setEndTime(state, time) {
      state.endTime = new Date(time)
    },
    setCurrentTime(state) {
      state.currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
    },
  },

  actions: {
    checkTime({ state, commit }) {
      const now = new Date()
      if (state.endTime.getTime() < now.getTime()) {
        const time = new Date(now.setMinutes(now.getMinutes() + 30))
        commit('setEndTime', time)
      }
      commit('setCurrentTime')
    },
  },
  getters: {
    startTime(state) {
      return state.startTime
    },
    endTime(state) {
      return state.endTime
    },
    currentTime(state) {
      return state.currentTime
    },
  },
}
