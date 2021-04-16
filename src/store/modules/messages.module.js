import { RndID } from '@/common/utilites'

export default {
  namespaced: true,
  state() {
    return {
      messages: [], //{type: 'danger', caption: 'warning', text: 'server error', timeout:5000, time: new Date(), count: 1}
    }
  },
  mutations: {
    addMessage(state, msg) {
      const exist = state.messages.find((m) => m.caption === msg.caption && m.text === msg.text)
      if (exist) {
        exist.time = new Date().getTime()
        exist.count++
      } else {
        state.messages.push({ id: RndID(), ...msg, time: new Date().getTime(), count: 1 })
      }
    },
    deleteMessage(state, id) {
      state.messages = state.messages.filter((m) => m.id !== id)
    },
    setMessages(state, messages) {
      state.messages = messages
    },
  },

  actions: {
    newMessage({ commit, dispatch }, msg) {
      commit('addMessage', msg)
      dispatch('rotateMessages')
    },
    rotateMessages({ commit, state, dispatch }) {
      if (state.messages.length === 0) {
        return
      }
      const messages = state.messages.filter((msg) => {
        return msg.time + msg.timeout > new Date().getTime()
      })
      commit('setMessages', messages)
      if (messages.length > 0) {
        setTimeout(() => {
          dispatch('rotateMessages')
        }, 500)
      }
    },
  },
  getters: {
    all(state) {
      return state.messages
    },
  },
}
