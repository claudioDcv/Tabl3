export default (param, urlArg) => {
  // prefer to use l.search if you have a location/link object
  const url = urlArg
  const urlparts = url.split('?')
  if (urlparts.length >= 2) {
    const prefix = `${encodeURIComponent(param)}=`
    const pars = urlparts[1].split(/[&;]/g)
    // reverse iteration as may be destructive
    for (let i = pars.length - 1; i > 0; i -= 1) {
      // idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1)
      }
    }
    return urlparts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '')
  }
  return url
}
