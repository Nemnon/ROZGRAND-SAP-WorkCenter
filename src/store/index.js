import { createStore } from 'vuex'
import time from './modules/time.module'
import messages from './modules/messages.module'

export default createStore({
  state() {},
  mutations: {},
  actions: {},
  modules: { time, messages },
})
