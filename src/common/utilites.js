import moment from 'moment'

export function getDateTime(d = undefined) {
  return moment(d).format('YYYY-MM-DD HH:mm:ss')
}

export function RndID() {
  return Math.random().toString(36).substr(2, 9)
}

export function copyObj(obj) {
  if (!obj) {
    return undefined
  }
  return JSON.parse(JSON.stringify(obj))
}
