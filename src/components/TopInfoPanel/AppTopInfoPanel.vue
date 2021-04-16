<template>
  <div>
    <app-w-c-line :work-center-guid="wcGuid"></app-w-c-line>
  </div>
</template>

<script>
import 'vis/dist/vis-timeline-graph2d.min.css'
import { useStore } from 'vuex'
import { computed } from 'vue'
import AppWCLine from '@/components/WCLine/AppWCLine'
export default {
  name: 'AppTopInfoPanel',
  components: { AppWCLine },
  setup() {
    //   'E21FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   'E31FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   'E41FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   'E51FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   'E61FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   'E71FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   'E81FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   'E91FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   'EA1FD4D3-1928-E911-8C41-4CCC6A3138C5',
    //   '668C0263-E18A-EA11-8C61-4CCC6A3138C5',
    const store = useStore()
    const currentTime = computed(() => store.getters['time/currentTime'])
    const wcGuid = new URL(window.location.href).searchParams.get('guid')

    return {
      currentTime,
      wcGuid,
    }
  },
}
</script>

<style>
.vis-item.vis-background.event1 {
  background-color: rgba(0, 0, 255, 0.2);
}
.vis-item.vis-background.event2 {
  background-color: rgba(0, 255, 0, 0.2);
}
.vis-item.vis-background.event3 {
  background-color: rgba(0, 0, 255, 0.2);
}
.vis-item.vis-background.event4 {
  background-color: rgba(255, 0, 0, 0.2);
}
.vis-item.vis-background.event5 {
  background-color: rgba(0, 0, 0, 0.4);
}
.vis-item.vis-background.event6 {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
