import updateOrCreateParam from './updateOrCreateParamFromQS'
import removeParam from './removeParamFromQS'
import extractParam from './extractParamFromQS'
import extractParamInt from './extractParamFromQSInt'

import { API } from './const'

export const dotNotationToObject = (obj, key) => key.split('.').reduce((o, i) => o[i], obj)
export const makeKey = (key, props) => {
  if (props) {
    if (props.element && props.key) {
      return dotNotationToObject(props.element, props.key);
    }
  }
  return key;
}

export const updateOrCreateParamFromQS = updateOrCreateParam
export const removeParamFromQS = removeParam
export const extractParamFromQS = extractParam
export const extractParamFromQSInt = extractParamInt

export const makePaginator = (data, opt, redefineParamsConection) => {

  if (redefineParamsConection) {
    let params = redefineParamsConection
    API.OFFSET = params.offset || API.OFFSET
    API.LIMIT = params.limit || API.LIMIT
    API.COUNT = params.count || API.COUNT
    API.ORDERING = params.ordering || API.ORDERING
  }
  const service = data
  const pg = {}

  if (!service) {
    return false
  }


  pg[API.COUNT] = service[API.COUNT]
  pg[API.LIMIT] = parseInt(extractParamInt(API.LIMIT, opt.url), 10) || service.results.length
  pg[API.OFFSET] = parseInt(extractParamInt(API.OFFSET, opt.url), 10)

  const urlNext = updateOrCreateParam(opt.url, API.LIMIT, pg[API.LIMIT])
  const urlPrev = updateOrCreateParam(opt.url, API.LIMIT, pg[API.LIMIT])
  const offsetNext = pg[API.OFFSET] + pg[API.LIMIT]

  pg.next = updateOrCreateParam(urlNext, API.OFFSET, offsetNext)
  const prevOffset = pg[API.OFFSET] - pg[API.LIMIT] <= 0 ? 0 : pg[API.OFFSET] - pg[API.LIMIT]

  pg.prev = updateOrCreateParam(urlPrev, API.OFFSET, prevOffset)

  pg.lastPage = pg[API.COUNT] <= pg[API.OFFSET] + pg[API.LIMIT]
  pg.firstPage = pg[API.OFFSET] === 0
  pg.current = offsetNext / pg[API.LIMIT]
  const pages = pg[API.COUNT] - pg[API.COUNT] % pg[API.LIMIT] + pg[API.LIMIT]

  const countDivLimit = pg[API.COUNT] / pg[API.LIMIT]
  pg.pages = pg[API.COUNT] % pg[API.LIMIT] > 0 ? pages / pg[API.LIMIT] : countDivLimit
  pg.ordering = extractParam(API.ORDERING, opt.url)

  const ordering = pg.ordering

  pg.orderingBy = ordering.slice(0, 1) === '-' ? ordering.slice(1) : ordering
  pg.orderingMode = ordering.slice(0, 1) === '-' ? '-' : ''

  pg.actual = updateOrCreateParam(opt.url, API.OFFSET, pg[API.OFFSET])
  pg.actual = updateOrCreateParam(pg.actual, API.ORDERING, ordering)
  pg.next = updateOrCreateParam(pg.next, API.ORDERING, ordering)
  pg.prev = updateOrCreateParam(pg.prev, API.ORDERING, ordering)
  return pg
}
