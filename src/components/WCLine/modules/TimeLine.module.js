import { Timeline, DataSet } from 'vis'

export class TimeLineModule {
  timeLine = null
  dataSet = null
  timeLineOptions = {
    moveable: false,
    selectable: false,
    height: '80px',
    showMajorLabels: false,
    showCurrentTime: true,
    start: new Date(),
    end: new Date(),
  }

  constructor() {
    this.dataSet = new DataSet()
  }

  init(el_timeline) {
    this.timeLine = new Timeline(el_timeline.value, this.dataSet, this.timeLineOptions)
  }

  setTime(startTime, endTime) {
    this.timeLineOptions.start = startTime
    this.timeLineOptions.end = endTime
    this.timeLine.setOptions(this.timeLineOptions)
  }

  setData(data) {
    this.dataSet.clear()
    for (let idx = 0; idx < data.length; idx++) {
      let message = ''
      const row = data[idx]
      if (row.event === 1) {
        message = row.jobname || 'ОШИБКА'
      } else {
        if (row.event !== 2) {
          message = row.text_event.replace(/-/g, '<br>')
        }
      }
      if (row.comment) message += `<br><b>${row.comment}</b>`

      const end = idx + 1 === data.length ? new Date() : new Date(data[idx + 1].dstart)

      this.dataSet.add({
        id: row.guid,
        start: row.dstart,
        end,
        type: 'background',
        className: 'event' + row.event,
        content: message,
      })
    }
    setTimeout(() => {
      this.timeLine.redraw()
    }, 500)
  }

  destroy() {
    this.timeLine.destroy()
  }
}
