<template>
  <app-m-table :data="data" :fields="dataFields" row-key="guid"></app-m-table>
  <div></div>
</template>

<script>
import AppMTable from '@/components/MTable/AppMTable'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'AppMainPanel',
  components: { AppMTable },
  setup() {
    const store = useStore()
    const dataFields = [
      { id: 1, name: 'event', label: '', width: '30px' },
      { id: 2, name: 'dstart', label: 'Дата', width: '160px' },
      { id: 3, name: 'jobname', label: 'Заказ', width: '100%' },
      { id: 4, name: 'text_event', label: 'Событие', width: '150px' },
      { id: 5, name: 'comment', label: 'Комментарий', width: '120px' },
    ]

    const data = computed(() => store.getters['wc/journal'])

    return { data, dataFields }
  },
}
</script>

<style scoped></style>
