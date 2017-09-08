'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint no-console: 0 */
var errorInitialTable = exports.errorInitialTable = function errorInitialTable(state, props) {
  var hasError = false;
  if (!props.config.ajax) {
    console.warn(state.name, state.version, 'config.ajax is required');
    hasError = true;
  }
  if (!props.config.columns) {
    console.warn(state.name, state.version, 'columns is required');
    hasError = true;
  }
  return !hasError;
};
var otherError = exports.otherError = function otherError() {
  return 'test';
};