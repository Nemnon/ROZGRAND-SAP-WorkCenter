<template>
  <div v-if="messages.length > 0" class="popup-messages">
    <div
      v-for="msg of messages"
      :key="msg.id"
      class="popup-messages__item"
      :class="msg.type"
      @click="dismissMsg(msg.id)"
    >
      <div v-if="msg.count > 1" class="popup-messages__item__count">{{ msg.count }}</div>
      <div class="popup-messages__item__caption">{{ msg.caption }}</div>
      <div class="popup-messages__item__text">{{ msg.text }}</div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'AppPopupMessages',
  setup() {
    const store = useStore()
    const messages = computed(() => {
      return store.getters['messages/all']
    })
    const dismissMsg = (id) => {
      store.commit('messages/deleteMessage', id)
    }
    return { messages, dismissMsg }
  },
}
</script>

<style lang="scss">
.popup-messages {
  position: absolute;
  top: 7px;
  right: 7px;
  max-width: 400px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  &__item {
    &.danger {
      background-color: red;
      color: white;
    }
    &.info {
      background-color: #4b4bfd;
      color: white;
    }
    display: flex;
    flex-direction: column;
    min-height: 100px;
    min-width: 200px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 13px 10px 10px 10px;
    position: relative;
    box-shadow: -3px 4px 10px #0000006b;
    &__caption {
      padding: 5px;
      text-align: center;
      margin-bottom: 5px;
      opacity: 0.8;
    }
    &__text {
    }
    &__count {
      position: absolute;
      top: -4px;
      left: -4px;
      padding: 3px 5px 3px 5px;
      //background-color: #00a586;
      background-color: inherit;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
      border-radius: 4px;
      font-size: 0.7rem;
    }
  }
}
</style>
