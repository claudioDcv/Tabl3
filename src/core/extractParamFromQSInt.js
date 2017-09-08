export default (paramArg, urlArg) => {
  let url = urlArg
  if (!url) {
    url = window.location.href
  }
  const param = paramArg.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${param}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) {
    return 0
  }
  if (!results[2]) {
    return 0
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
