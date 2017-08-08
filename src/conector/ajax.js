import axios from 'axios'

const ajax = (opt, callback, errorCallback, nonErrorAjax, onAfterSend) => {
  axios(opt).then(
    response => {
      nonErrorAjax()
      callback(response.data, response, opt)
      onAfterSend(response)
    },
    response => errorCallback(response)
  )
}

export default ajax
