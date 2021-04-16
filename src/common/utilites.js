import moment from 'moment'

export function getDateTime(d = undefined) {
  return moment(d).format('YYYY-MM-DD HH:mm:ss')
}
