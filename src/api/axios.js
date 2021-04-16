import axios from 'axios'

const requestAxios = axios.create({
  baseURL: 'http://192.168.7.11',
})

requestAxios.interceptors.response.use(null, (error) => {
  if (error?.response?.status === 401) {
    // router.push('/auth?message=auth')
  }

  return Promise.reject(error)
})

export default requestAxios
