import { createStore } from 'vuex'
import messages from './modules/messages.module'
import wc from './modules/wc.module'

export default createStore({
  state() {},
  mutations: {},
  actions: {},
  modules: { messages, wc },
})
