import { copyObj, getDateTime } from '@/common/utilites'
import { ERR_SERVER_ERROR } from '@/common/Errors'

const WORKER_TIME = 12

export class WorkCenter {
  constructor(http, wcGuid, interval = 3000) {
    if (!http) throw new Error('No HTTP transport defined!')
    if (!wcGuid) throw new Error('No WorkCenter GUID defined!')
    this._http = http
    this._wcGuid = wcGuid
    this._interval = interval

    this._destroyed = false
    this._timer = null
    this._workCenterInfo = null
    this._journalList = null
    this._freqList = null
    this._startTime = new Date()
    this._endTime = new Date()

    this._listeners = {}

    this._work()
  }

  on(event, callback) {
    this._listeners[event] = this._listeners[event] || []
    this._listeners[event].push(callback)
    return () => {
      this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback)
    }
  }

  _emit(event, data) {
    if (!Array.isArray(this._listeners[event])) {
      return false
    }
    this._listeners[event].forEach((listener) => {
      listener(copyObj(data))
    })
    return true
  }

  async _getWCInfo() {
    const { data } = await this._http.get(`api/wc/${this._wcGuid}`)
    if (data.length > 0) {
      this._workCenterInfo = data[0]
      this._emit('info', this._workCenterInfo)
    } else {
      throw new Error('Error get WorkCenter Info!')
    }
  }

  async _getWCFreq() {
    let { data } = await this._http.get(
      `api/wc/freq/${this._wcGuid}?date=${getDateTime(this._startTime)}`
    )
    if (data.length > 0) {
      this._freqList = data
      this._emit('freq_list', this._freqList)
    }
  }

  async _getWCJournal() {
    let { data } = await this._http.get(`api/wc/journal/${this._wcGuid}`)
    if (data.length > 0) {
      this._journalList = data
      this._emit('journal_list', this._journalList)
      if (this._startTime.getTime() !== new Date(data[data.length - 1].dstart).getTime()) {
        this._startTime = new Date(data[data.length - 1].dstart)
        this._endTime = new Date(new Date().setHours(this._startTime.getHours() + WORKER_TIME))
        this._emit('time_changed', { startTime: this._startTime, endTime: this._endTime })
      }
    }
  }

  _rearmTimer() {
    if (!this._destroyed) {
      this._timer = setTimeout(() => this._work(), this._interval)
    }
  }

  async _work() {
    try {
      if (!this._workCenterInfo) {
        await this._getWCInfo()
      }
      await this._getWCJournal()
      await this._getWCFreq()
    } catch (e) {
      this._emit('error', {
        code: ERR_SERVER_ERROR,
        msg: e.response?.data?.message || e.response?.data?.error || e.message,
      })
    }
    this._rearmTimer()
  }

  destroy() {
    this._destroyed = true
    clearTimeout(this._timer)
  }
}
