<template>
  <div>
    <div ref="el_timeline"></div>
    <div style="position: absolute; right: 2px; z-index: 2">
      <canvas ref="el_gauge" style="width: 100px; height: 50px"></canvas>
      <span
        ref="el_speed"
        style="
          position: absolute;
          left: 0;
          right: 0;
          text-align: center;
          bottom: 9px;
          font-weight: bold;
        "
      ></span>
    </div>
    <div ref="el_graph"></div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue'
import { ErrorMessage } from '@/common/Errors'
import usePopupMessages from '@/use/PopupMessages/usePopupMessages'
import useWCLineAdapter from '@/components/WCLine/modules/useWCLineAdapter'

export default {
  props: {
    workCenterGuid: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { newMessage } = usePopupMessages()
    const { onError, destroy, init } = useWCLineAdapter(props.workCenterGuid)

    const el_timeline = ref(null)
    const el_gauge = ref(null)
    const el_graph = ref(null)
    const el_speed = ref(null)

    onError(({ code, msg = '' }) => {
      newMessage({
        type: 'danger',
        caption: ErrorMessage(code),
        text: msg,
        timeout: 60000,
      })
    })

    onMounted(() => {
      init(el_timeline, el_graph, el_gauge, el_speed)
    })

    onUnmounted(() => {
      destroy()
    })

    return {
      el_timeline,
      el_gauge,
      el_graph,
      el_speed,
    }
  },
}
</script>

<style scoped></style>
