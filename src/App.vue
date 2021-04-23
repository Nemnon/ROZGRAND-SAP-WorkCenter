<template>
  <div class="app">
    <div class="app__header">
      <app-top-info-panel></app-top-info-panel>
    </div>
    <div class="app__main">
      <app-main-panel></app-main-panel>
    </div>
    <div class="app__footer">footer</div>
  </div>
  <app-popup-messages></app-popup-messages>
</template>

<script>
import AppTopInfoPanel from '@/components/TopInfoPanel/AppTopInfoPanel'
import AppPopupMessages from '@/use/PopupMessages/AppPopupMessages'
import AppMainPanel from '@/components/MainPanel/AppMainPanel'
export default {
  name: 'App',
  components: { AppMainPanel, AppPopupMessages, AppTopInfoPanel },
  setup() {},
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
}

.app {
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  &__header {
    flex: 0 0 auto;
    margin-bottom: 5px;
  }
  &__main {
    flex: 1 1 auto;
    position: relative;
    min-height: 0;
  }
  &__footer {
    margin-top: 5px;
    flex: 0 0 auto;
  }
}
</style>
