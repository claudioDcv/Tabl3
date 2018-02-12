'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePaginator = exports.dotNotationToObject = exports.querystringToJSON = exports.extractParamFromQSInt = exports.extractParamFromQS = exports.removeParamFromQS = exports.updateOrCreateParamFromQS = exports.makeKey = undefined;

var _updateOrCreateParamFromQS = require('./updateOrCreateParamFromQS');

var _updateOrCreateParamFromQS2 = _interopRequireDefault(_updateOrCreateParamFromQS);

var _removeParamFromQS = require('./removeParamFromQS');

var _removeParamFromQS2 = _interopRequireDefault(_removeParamFromQS);

var _extractParamFromQS = require('./extractParamFromQS');

var _extractParamFromQS2 = _interopRequireDefault(_extractParamFromQS);

var _extractParamFromQSInt = require('./extractParamFromQSInt');

var _extractParamFromQSInt2 = _interopRequireDefault(_extractParamFromQSInt);

var _queryStringToJSON = require('./queryStringToJSON');

var _queryStringToJSON2 = _interopRequireDefault(_queryStringToJSON);

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeKey = exports.makeKey = function makeKey(key) {
  return key;
};
var updateOrCreateParamFromQS = exports.updateOrCreateParamFromQS = _updateOrCreateParamFromQS2.default;
var removeParamFromQS = exports.removeParamFromQS = _removeParamFromQS2.default;
var extractParamFromQS = exports.extractParamFromQS = _extractParamFromQS2.default;
var extractParamFromQSInt = exports.extractParamFromQSInt = _extractParamFromQSInt2.default;
var querystringToJSON = exports.querystringToJSON = _queryStringToJSON2.default;
var dotNotationToObject = exports.dotNotationToObject = function dotNotationToObject(obj, key) {
  return key.split('.').reduce(function (o, i) {
    return o[i];
  }, obj);
};

var makePaginator = exports.makePaginator = function makePaginator(data, opt, redefineParamsConection) {

  if (redefineParamsConection) {
    var params = redefineParamsConection;
    _const.API.OFFSET = params.offset || _const.API.OFFSET;
    _const.API.LIMIT = params.limit || _const.API.LIMIT;
    _const.API.COUNT = params.count || _const.API.COUNT;
    _const.API.ORDERING = params.ordering || _const.API.ORDERING;
  }
  var service = data;
  var pg = {};

  if (!service) {
    return false;
  }

  pg[_const.API.COUNT] = service[_const.API.COUNT];
  pg[_const.API.LIMIT] = parseInt((0, _extractParamFromQSInt2.default)(_const.API.LIMIT, opt.url), 10) || service.results.length;
  pg[_const.API.OFFSET] = parseInt((0, _extractParamFromQSInt2.default)(_const.API.OFFSET, opt.url), 10);

  var urlNext = (0, _updateOrCreateParamFromQS2.default)(opt.url, _const.API.LIMIT, pg[_const.API.LIMIT]);
  var urlPrev = (0, _updateOrCreateParamFromQS2.default)(opt.url, _const.API.LIMIT, pg[_const.API.LIMIT]);
  var offsetNext = pg[_const.API.OFFSET] + pg[_const.API.LIMIT];

  pg.next = (0, _updateOrCreateParamFromQS2.default)(urlNext, _const.API.OFFSET, offsetNext);
  var prevOffset = pg[_const.API.OFFSET] - pg[_const.API.LIMIT] <= 0 ? 0 : pg[_const.API.OFFSET] - pg[_const.API.LIMIT];

  pg.prev = (0, _updateOrCreateParamFromQS2.default)(urlPrev, _const.API.OFFSET, prevOffset);

  pg.lastPage = pg[_const.API.COUNT] <= pg[_const.API.OFFSET] + pg[_const.API.LIMIT];
  pg.firstPage = pg[_const.API.OFFSET] === 0;
  pg.current = offsetNext / pg[_const.API.LIMIT];
  var pages = pg[_const.API.COUNT] - pg[_const.API.COUNT] % pg[_const.API.LIMIT] + pg[_const.API.LIMIT];

  var countDivLimit = pg[_const.API.COUNT] / pg[_const.API.LIMIT];
  pg.pages = pg[_const.API.COUNT] % pg[_const.API.LIMIT] > 0 ? pages / pg[_const.API.LIMIT] : countDivLimit;
  pg.ordering = (0, _extractParamFromQS2.default)(_const.API.ORDERING, opt.url);

  var ordering = pg.ordering;

  pg.orderingBy = ordering.slice(0, 1) === '-' ? ordering.slice(1) : ordering;
  pg.orderingMode = ordering.slice(0, 1) === '-' ? '-' : '';

  pg.actual = (0, _updateOrCreateParamFromQS2.default)(opt.url, _const.API.OFFSET, pg[_const.API.OFFSET]);
  pg.actual = (0, _updateOrCreateParamFromQS2.default)(pg.actual, _const.API.ORDERING, ordering);
  pg.next = (0, _updateOrCreateParamFromQS2.default)(pg.next, _const.API.ORDERING, ordering);
  pg.prev = (0, _updateOrCreateParamFromQS2.default)(pg.prev, _const.API.ORDERING, ordering);
  return pg;
};