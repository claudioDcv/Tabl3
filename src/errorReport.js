/* eslint no-console: 0 */
export const errorInitialTable = props => {
  let hasError = false
  if (!props.config.ajax) {
    console.warn(this.name, this.version, 'config.ajax is required')
    hasError = true
  }
  if (!props.config.columns) {
    console.warn(this.name, this.version, 'columns is required')
    hasError = true
  }
  return !hasError
}
export const otherErro = () => 'test'
