import axios from '@/api/axios'
import { copyObj, getDateTime } from '@/common/utilites'
import { ERR_SERVER_ERROR, ERR_WC_GUID } from '@/common/Errors'
import { GraphModule } from '@/components/WCLine/modules/Graph.module'
import { TimeLineModule } from '@/components/WCLine/modules/TimeLine.module'

export class WCLine {
  WC = null
  wcJournalData = null
  wcGraphData = null
  wcGuid = null
  timeLine = null
  graph = null
  timer = null
  startTime = new Date()
  endTime = new Date()
  onErrorHandler = null
  onWCInfoReceivedHandler = null
  onWCJournalReceivedHandler = null
  destroyed = false

  constructor(wcGuid) {
    this.wcGuid = wcGuid
    this.timeLine = new TimeLineModule()
    this.graph = new GraphModule()
  }

  init(el_timeline, el_graph, el_gauge, el_speed) {
    if (!this.wcGuid) {
      this._error(ERR_WC_GUID)
    }
    this.timeLine.init(el_timeline)
    this.graph.init(el_graph, el_gauge, el_speed)
    this._job()
  }

  onError(callback) {
    this.onErrorHandler = callback
  }

  onWCInfoReceived(callback) {
    this.onWCInfoReceivedHandler = callback
  }
  onWCJournalReceived(callback) {
    this.onWCJournalReceivedHandler = callback
  }

  _error(code, msg) {
    if (this.onErrorHandler) {
      this.onErrorHandler(code, msg)
    }
  }

  async _getWCInfo() {
    if (!this.wcGuid) {
      return false
    }
    try {
      const { data } = await axios.get(`api/wc/${this.wcGuid}`)
      if (data.length > 0) {
        if (this.onWCInfoReceivedHandler) {
          this.onWCInfoReceivedHandler(copyObj(data[0]))
        }
        return data[0]
      }
    } catch (e) {
      this._error(
        ERR_SERVER_ERROR,
        e.response?.data?.message || e.response?.data?.error || e.message
      )
    }
    return false
  }

  _workTimeChanged() {
    this.timeLine.setTime(this.startTime, this.endTime)
    this.graph.setTime(this.startTime, this.endTime)
  }

  async _getWCJournal() {
    try {
      let { data } = await axios.get(`api/wc/journal/${this.wcGuid}`)
      if (data.length > 0) {
        data = data.reverse()
        if (this.startTime.getTime() !== new Date(data[0].dstart).getTime()) {
          this.startTime = new Date(data[0].dstart)
          this.endTime = new Date(new Date().setHours(this.startTime.getHours() + 12))
          this._workTimeChanged()
        }
        this.wcJournalData = data
        if (this.onWCJournalReceivedHandler) {
          this.onWCJournalReceivedHandler(copyObj(data))
        }
        return true
      }
    } catch (e) {
      this._error(
        ERR_SERVER_ERROR,
        e.response?.data?.message || e.response?.data?.error || e.message
      )
    }
    this.wcJournalData = null
    return false
  }

  async _getWCFreqList() {
    try {
      let { data } = await axios.get(
        `api/wc/freq/${this.wcGuid}?date=${getDateTime(this.startTime)}`
      )
      if (data.length > 0) {
        this.wcGraphData = data
        const speed = this.wcGraphData[this.wcGraphData.length - 1].Freq
        this.wcGraphData.push({
          query_date: new Date(),
          Freq: speed,
        })
        this.graph.setCurrentSpeed(speed)
        return true
      }
    } catch (e) {
      this._error(
        ERR_SERVER_ERROR,
        e.response?.data?.message || e.response?.data?.error || e.message
      )
    }
    this.wcGraphData = null
    return false
  }

  async _job() {
    if (!this.WC) {
      const wcInfo = await this._getWCInfo()
      if (wcInfo) {
        this.WC = wcInfo
        this.graph.setAverageSpeed(this.WC.avg_speed)
      } else {
        this._error(ERR_SERVER_ERROR, 'No work center info received!')
      }
    }

    if (this.WC) {
      const jResult = await this._getWCJournal()
      const fResult = await this._getWCFreqList()
      if (jResult) this.timeLine.setData(this.wcJournalData)
      if (fResult) this.graph.setData(this.wcGraphData)
    }

    if (this.destroyed) {
      return
    }
    this.timer = setTimeout(() => {
      this._job()
    }, 5000)
  }

  destroy() {
    this.destroyed = true
    clearTimeout(this.timer)
    this.timeLine.destroy()
    this.graph.destroy()
  }
}
