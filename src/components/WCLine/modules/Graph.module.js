import { Graph2d, DataSet } from 'vis'
import { Gauge } from 'gaugeJS/dist/gauge.min'

export class GraphModule {
  graph = null
  gauge = null
  dataSet = null
  startTime = null
  endTime = null
  speed = null
  averageSpeed = 0
  graphOptions = {
    groups: [
      {
        id: 0,
        style: 'stroke:blue;stroke-width:1;',
        options: {
          shaded: {
            orientation: 'bottom',
            style: 'fill:blue; fill-opacity:0.3;',
          },
        },
      },
      {
        id: 1,
        style: 'stroke:red;stroke-width:1',
      },
    ],

    options: {
      moveable: false,
      dataAxis: {
        visible: false,
        left: { range: { min: 0 } },
      },
      height: '60px',
      drawPoints: false,
      interpolation: false,
      showMajorLabels: false,
      showMinorLabels: false,
      showCurrentTime: true,
      start: new Date(),
      end: new Date(),
    },
  }
  gaugeOptions = {
    angle: 0, // The span of the gauge arc
    pointer: {
      length: 0, // // Relative to gauge radius
      strokeWidth: 0, // The thickness
      color: '#000000', // Fill color
    },
    lineWidth: 0.4, // The line thickness
    radiusScale: 1, // Relative radius
    limitMax: false, // If false, max value increases automatically if value > maxValue
    limitMin: false, // If true, the min value of the gauge will be fixed
    strokeColor: '#E0E0E0', // to see which ones work best for you
    percentColors: [
      [0.0, '#ff0000'],
      [0.5, '#f9c802'],
      [1.0, '#00ff00'],
    ],
    generateGradient: true,
    highDpiSupport: true, // High resolution support
  }

  constructor() {
    this.dataSet = new DataSet()
  }

  _updateAverageLine(startTime, endTime, avgSpeed) {
    let averageLineStart = this.dataSet.get(0) || { id: 0, x: 0, y: 0, group: 1 }
    let averageLineEnd = this.dataSet.get(1) || { id: 1, x: 0, y: 0, group: 1 }

    if (startTime && endTime) {
      averageLineStart.x = startTime
      averageLineEnd.x = endTime
    }
    if (avgSpeed) {
      averageLineStart.y = avgSpeed
      averageLineEnd.y = avgSpeed
    }
    this.dataSet.update(averageLineStart)
    this.dataSet.update(averageLineEnd)
  }

  init(el_graph, el_gauge, el_speed) {
    this.graph = new Graph2d(el_graph.value, this.dataSet, this.graphOptions.groups, this.graphOptions.options)
    this.gauge = new Gauge(el_gauge.value)
    this.speed = el_speed
    this.gauge.setOptions(this.gaugeOptions)
    this.gauge.maxValue = 0
  }

  setTime(startTime, endTime) {
    this.startTime = startTime
    this.endTime = endTime
    this.graphOptions.options.start = startTime
    this.graphOptions.options.end = endTime
    this.graph.setOptions(this.graphOptions.options)
    this._updateAverageLine(this.startTime, this.endTime, this.averageSpeed)
  }

  setAverageSpeed(speed) {
    this.averageSpeed = speed
    this.gauge.maxValue = this.averageSpeed * 2
  }

  setCurrentSpeed(speed) {
    this.gauge.set(speed)
    if (this.speed?.value) {
      this.speed.value.innerText = speed
    }
  }

  setData(data) {
    this.dataSet.clear()
    this._updateAverageLine(this.startTime, this.endTime, this.averageSpeed)

    this.dataSet.add(
      data.map((d) => {
        return { x: d.query_date, y: d.Freq, group: 0 }
      })
    )
  }

  destroy() {
    this.graph.destroy()
  }
}
