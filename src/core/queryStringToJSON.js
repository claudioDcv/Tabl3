export default (qs) => {
  let queryString = qs;
  let pairs = '';
  const result = {};
  if (queryString) {
    if (queryString.indexOf('?') > -1) {
      queryString = queryString.split('?')[1];
    }
    pairs = queryString.split('&');
    pairs.forEach((p) => {
      let pair = p;
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
  }
  return result;
};
