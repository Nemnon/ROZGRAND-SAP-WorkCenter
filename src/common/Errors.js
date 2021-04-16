export const ERR_WC_GUID = 'ERR_WC_GUID'
export const ERR_SERVER_ERROR = 'ERR_SERVER_ERROR'

const errors = {
  ERR_WC_GUID: 'В адресной строке должен быть параметр с guid рабочего центра!',
  ERR_SERVER_ERROR: 'В процессе запроса к серверу возникла ошибка',
}

export function ErrorMessage(code) {
  return errors[code]
}
