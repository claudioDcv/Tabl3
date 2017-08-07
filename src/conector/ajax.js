import axios from 'axios'
import { API } from '../__tests__/api'

const ajax = (opt, callback, errorCallback, nonErrorAjax, onAfterSend) => {
  if (opt) {
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
  } else {
    axios(opt).then(
      response => {
        nonErrorAjax()
        callback(response.data, response, opt)
        onAfterSend(response)
      },
      response => errorCallback(response)
    )
  }
}

export default ajax
