/* eslint no-console: 0 */
export const errorInitialTable = (state, props) => {
  let hasError = false
  if (!props.config.ajax) {
    console.warn(state.name, state.version, 'config.ajax is required')
    hasError = true
  }
  if (!props.config.columns) {
    console.warn(state.name, state.version, 'columns is required')
    hasError = true
  }
  return !hasError
}
export const otherError = () => 'test'
