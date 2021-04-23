import { ref } from 'vue'
import { RndID } from '@/common/utilites'

const messages = ref([]) //{type: 'danger', caption: 'warning', text: 'server error', timeout:5000, time: new Date(), count: 1}

function addMessage(msg) {
  const exist = messages.value.find((m) => m.caption === msg.caption && m.text === msg.text)
  if (exist) {
    exist.time = new Date().getTime()
    exist.count++
  } else {
    messages.value.push({ id: RndID(), ...msg, time: new Date().getTime(), count: 1 })
  }
}

function deleteMessage(id) {
  messages.value = messages.value.filter((m) => m.id !== id)
}

function newMessage(msg) {
  addMessage(msg)
  rotateMessages()
}

function rotateMessages() {
  if (messages.value.length === 0) {
    return
  }
  messages.value = messages.value.filter((msg) => {
    return msg.time + msg.timeout > new Date().getTime()
  })
  if (messages.value.length > 0) {
    setTimeout(() => {
      rotateMessages()
    }, 500)
  }
}

export default function () {
  return {
    messages,
    newMessage,
    deleteMessage,
  }
}
