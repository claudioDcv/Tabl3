export default (paramArg, urlArg) => {
  let url = urlArg
  if (!url) {
    url = window.location.href
  }
  const param = paramArg.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${param}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) {
    return ''
  }
  if (!results[2]) {
    return ''
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
