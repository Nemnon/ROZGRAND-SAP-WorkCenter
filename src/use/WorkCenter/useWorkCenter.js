import { WorkCenter } from '@/use/WorkCenter/WorkCenter'
import axios from '@/api/axios'

const wcList = new Map()

export default function (wcGuid) {
  let wc

  const unSubList = []
  let onJournalListHandler = null
  let onFreqListHandler = null
  let onInfoHandler = null
  let onTimeChangedHandler = null
  let onErrorHandler = null

  function onJournalList(callback) {
    onJournalListHandler = callback
  }

  function onFreqList(callback) {
    onFreqListHandler = callback
  }

  function onInfo(callback) {
    onInfoHandler = callback
  }

  function onTimeChanged(callback) {
    onTimeChangedHandler = callback
  }

  function onError(callback) {
    onErrorHandler = callback
  }

  function destroy() {
    unSubList.forEach((un) => {
      if (un) un()
    })
    const savedWC = wcList.get(wcGuid)
    if (savedWC) {
      savedWC.count--
      if (savedWC.count === 0) {
        wcList.delete(wcGuid)
        savedWC.wc.destroy()
      }
    }
  }

  if (!wcList.has(wcGuid)) {
    wc = new WorkCenter(axios, wcGuid)
    wcList.set(wcGuid, { wc, count: 1 })
  } else {
    const savedWC = wcList.get(wcGuid)
    wc = savedWC.wc
    savedWC.count++
    wcList.set(wcGuid, { wc, count: savedWC.count })
  }

  unSubList.push(
    wc.on('journal_list', (data) => {
      if (onJournalListHandler) onJournalListHandler(data)
    })
  )
  unSubList.push(
    wc.on('freq_list', (data) => {
      if (onFreqListHandler) onFreqListHandler(data)
    })
  )
  unSubList.push(
    wc.on('info', (data) => {
      if (onInfoHandler) onInfoHandler(data)
    })
  )
  unSubList.push(
    wc.on('time_changed', (data) => {
      if (onTimeChangedHandler) onTimeChangedHandler(data)
    })
  )
  unSubList.push(
    wc.on('error', (data) => {
      if (onErrorHandler) onErrorHandler(data)
    })
  )

  return { onJournalList, onFreqList, onInfo, onTimeChanged, onError, destroy }
}
