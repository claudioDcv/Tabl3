import { API } from './api'

const ajax = (opt, callback, errorCallback, nonErrorAjax, onAfterSend) => {
  const response = {
    config: {},
    headers: {},
    request: {},
    data: API[opt.url],
    status: 200,
    statusText: 'OK',
  }
  nonErrorAjax()
  callback(response.data, response, opt)
  onAfterSend(response)
  if (opt.simulateError) {
    errorCallback(response)
    return false
  }
}

export default ajax
