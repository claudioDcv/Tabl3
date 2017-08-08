import React, { Component } from 'react'
import THead from './THead'
import TBody from './TBody'
import TFooter from './TFooter'

import {
  PAGINATOR_GOTO_PAGE,
  PAGINATOR_PREV_PAGE,
  PAGINATOR_NEXT_PAGE,
  RESULTS_ORDERING,
} from './core/const'

import { updateOrCreateParamFromQS, makePaginator, removeParamFromQS } from './core/core'

import { errorInitialTable } from './errorReport'

class Table2 extends Component {
  static formatJSON(st, val) {
    return (
      <pre>
        {JSON.stringify(st[val], undefined, 4)}
      </pre>
    )
  }
  constructor(props) {
    super(props)
    const prs = props
    this.name = 'React Table ServerSide'
    this.version = 'v1.0.25'
    this.initError = false
    this.state = {
      initiaAjax: { ...prs.config.ajax },
      config: prs.config,
      dataset: {
        results: [],
      },
      columns: prs.config.columns,
      paginator: {},
      inputSearch: {},
      ajaxError: false,
    }
    this.updateState = this.updateState.bind(this)
    this.ajaxGotoPage = this.ajaxGotoPage.bind(this)
    this.initialState = this.initialState.bind(this)
    this.updateQueryStringOut = this.updateQueryStringOut.bind(this)
    this.handlerInputSearch = this.handlerInputSearch.bind(this)
    this.resetToInitialState = this.resetToInitialState.bind(this)
  }
  componentDidMount() {
    if (errorInitialTable(this, this.props)) {
      this.init()
    } else {
      this.initError = true;
    }
  }
  setStateService(dataset, response, opt) {
    this.setState({
      dataset,
      paginator: makePaginator(dataset, opt),
    })
  }
  updateState(key, val) {
    const data = this.state
    switch (key) {
      case PAGINATOR_GOTO_PAGE:
        this.ajaxGotoPage(val)
        break
      case PAGINATOR_PREV_PAGE:
        this.ajaxExec(this.state.paginator.prev)
        break
      case PAGINATOR_NEXT_PAGE:
        this.ajaxExec(this.state.paginator.next)
        break
      case RESULTS_ORDERING:
        this.ajaxExec(this.compareOrderingParam(val))
        break
      default:
        data[key] = val
        this.setState(data)
        this.ajax()
    }
  }
  updateQueryStringOut(cb, resetInputSearch) {
    let url = this.state.initiaAjax.url
    if (typeof cb === 'function') {
      const o = cb(this.state.paginator)
      if (o) {
        Object.keys(o).forEach(v => {
          if (Object.prototype.hasOwnProperty.call(o, v)) {
            if (o[v].value) {
              url = updateOrCreateParamFromQS(url, v, o[v])
            }
          }
        })
      }
    }
    if (resetInputSearch) {
      this.setState({ inputSearch: {} })
    } else {
      const o = this.state.inputSearch
      Object.keys(o).forEach(v => {
        if (Object.prototype.hasOwnProperty.call(o, v)) {
          if (o[v].value) {
            url = updateOrCreateParamFromQS(url, o[v].search, o[v].value)
          }
        }
      })
    }
    this.ajaxConector(
      {
        url,
        method: this.state.initiaAjax.method,
      },
      (dataset, response, opt) => {
        this.setStateService(dataset, response, opt)
      }
    )
  }
  compareOrderingParam(val) {
    const url = this.state.paginator.actual
    const o = this.state.inputSearch
    let param = ''

    if (this.state.paginator.orderingMode === '-') {
      param = val
    } else {
      param = `-${val}`
    }
    let urlCreate = updateOrCreateParamFromQS(url, 'ordering', param)

    Object.keys(o).forEach(v => {
      if (Object.prototype.hasOwnProperty.call(o, v)) {
        if (o[v].value) {
          urlCreate = updateOrCreateParamFromQS(urlCreate, o[v].search, o[v].value)
        }
      }
    })

    return urlCreate
  }
  ajax() {
    const cbResponse = (dataset, response, opt) => {
      this.setStateService(dataset, response, opt)
    }
    this.ajaxConector(this.state.config.ajax, cbResponse)
  }
  ajaxConector(configArg, cb) {
    const prs = this.props
    const config = configArg
    const confAjax = prs.config.ajax
    const headers = confAjax.liveHeaders ? confAjax.liveHeaders() : {}
    if (this.state.config.onBeforeSend) {
      this.state.config.onBeforeSend(config)
    }

    const ecb = e => {
      this.setState({ ajaxError: true }, this.state.config.errors.onAjaxError(e))
    }
    const nonErrorAjax = () => {
      this.setState({ ajaxError: false })
    }
    const cbAfterData = response => {
      if (this.state.config.onAfterSend) {
        this.state.config.onAfterSend(response.data)
      }
    }
    config.headers = {
      ...config.headers,
      ...headers,
    }
    this.state.config.conector(config, cb, ecb, nonErrorAjax, cbAfterData)
  }
  ajaxExec(url) {
    const method = this.state.initiaAjax.method
    this.ajaxConector({ method, url }, (dataset, response, opt) => {
      this.setStateService(dataset, response, opt)
    })
  }
  handlerInputSearch(key, value) {
    const i = this.state.inputSearch
    i[key] = value
    this.setState({ inputSearch: i })

    if (this.state.inputSearch && this.state.paginator.actual) {
      let url = this.state.paginator.actual
      const o = this.state.inputSearch
      Object.keys(o).forEach(v => {
        if (Object.prototype.hasOwnProperty.call(o, v)) {
          if (o[v].value) {
            url = updateOrCreateParamFromQS(url, o[v].search, o[v].value)
          } else {
            url = removeParamFromQS(o[v].search, url)
          }
        }
      })
      url = updateOrCreateParamFromQS(url, 'offset', 0)
      this.ajaxExec(url)
    }
  }
  resetToInitialState() {
    if (typeof this.state.config.table.resetButton.onReset === 'function') {
      this.state.config.table.resetButton.onReset()
    }
    this.initialState()
  }
  initialState() {
    const initiaAjax = this.state.initiaAjax
    this.setState({ inputSearch: {} })
    this.ajaxConector(initiaAjax, (dataset, response, opt) => {
      this.setStateService(dataset, response, opt)
    })
  }
  ajaxGotoPage(nPage) {
    const configAjax = this.state.config.ajax
    let url = this.state.paginator.actual
    url = updateOrCreateParamFromQS(url, 'offset', this.state.paginator.limit * (nPage - 1))
    configAjax.url = updateOrCreateParamFromQS(url, 'limit', this.state.paginator.limit)
    this.ajaxConector(configAjax, (dataset, response, opt) => {
      this.setStateService(dataset, response, opt)
    })
  }
  init() {
    this.ajax()
  }
  render() {
    const st = this.state
    const debug = st.config.debug
    if (st.ajaxError) {
      return <div />
    }
    return (
      <div>
        <table className={`table-2-new ${st.config.table.className}`}>
          <THead
            initialState={this.initialState}
            tableState={st}
            updateState={this.updateState}
            handlerInputSearch={this.handlerInputSearch}
            resetToInitialState={this.resetToInitialState}
          />
          <TBody tableState={st} updateState={this.updateState} />
          <TFooter tableState={st} updateState={this.updateState} />
        </table>
        {this.state.config.debug
          ? <div>
              {debug.inputSearch ? Table2.formatJSON(st, 'inputSearch') : undefined}
              {debug.initiaAjax ? Table2.formatJSON(st, 'initiaAjax') : undefined}
              {debug.paginator ? Table2.formatJSON(st, 'paginator') : undefined}
              {debug.dataset ? Table2.formatJSON(st, 'dataset') : undefined}
            </div>
          : null}
      </div>
    )
  }
}

Table2.propTypes = {}

export default Table2
