import useWorkCenter from '@/use/WorkCenter/useWorkCenter'
import { TimeLineModule } from '@/components/WCLine/modules/TimeLine.module'
import { GraphModule } from '@/components/WCLine/modules/Graph.module'

export default function (wcGuid) {
  const timeLine = new TimeLineModule()
  const graph = new GraphModule()
  const { onInfo, onJournalList, onFreqList, onTimeChanged, destroy, onError } = useWorkCenter(
    wcGuid
  )

  function init($timeline, $graph, $gauge, $speed) {
    timeLine.init($timeline)
    graph.init($graph, $gauge, $speed)
  }

  onInfo((data) => {
    graph.setAverageSpeed(data.avg_speed)
  })

  onTimeChanged(({ startTime, endTime }) => {
    timeLine.setTime(startTime, endTime)
    graph.setTime(startTime, endTime)
  })

  onJournalList((data) => {
    data = data.reverse()
    timeLine.setData(data)
  })

  onFreqList((data) => {
    const speed = data[data.length - 1].Freq
    data.push({
      query_date: new Date(),
      Freq: speed,
    })
    graph.setCurrentSpeed(speed)
    graph.setData(data)
  })

  return {
    init,
    onError,
    destroy,
  }
}
