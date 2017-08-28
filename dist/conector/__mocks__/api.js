'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var API = exports.API = {
  'http://127.0.0.1:8000/colors/?limit=4': {
    count: 13,
    results: [{
      id: 1,
      name: 'Blanco',
      natural_key: 'blanco'
    }, {
      id: 2,
      name: 'Negro',
      natural_key: 'negro'
    }, {
      id: 3,
      name: 'Cafe',
      natural_key: 'cafe'
    }, {
      id: 4,
      name: 'Asabache',
      natural_key: 'asabache'
    }]
  },
  'http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=': {
    count: 13,
    results: [{
      id: 5,
      name: 'Amarillo',
      natural_key: 'amarillo'
    }, {
      id: 6,
      name: 'Blanco Invierno',
      natural_key: 'blanco-invierno'
    }, {
      id: 8,
      name: 'Rojo',
      natural_key: 'rojo'
    }, {
      id: 9,
      name: 'Azul',
      natural_key: 'azul'
    }]
  },
  'http://127.0.0.1:8000/colors/?limit=4&offset=8&ordering=': {
    count: 13,
    results: [{
      id: 10,
      name: 'Verde',
      natural_key: 'verde'
    }, {
      id: 11,
      name: 'Verde Musgo',
      natural_key: 'verde-musgo'
    }, {
      id: 12,
      name: 'Gris',
      natural_key: 'gris'
    }, {
      id: 13,
      name: 'Rojizo',
      natural_key: 'rojizo'
    }]
  },
  'http://127.0.0.1:8000/colors/?limit=4&offset=8&ordering=-name': {
    count: 13,
    results: [{
      id: 6,
      name: 'Blanco Invierno',
      natural_key: 'blanco-invierno'
    }, {
      id: 1,
      name: 'Blanco',
      natural_key: 'blanco'
    }, {
      id: 9,
      name: 'Azul',
      natural_key: 'azul'
    }, {
      id: 4,
      name: 'Asabache',
      natural_key: 'asabache'
    }]
  },
  'http://127.0.0.1:8000/colors/?limit=4&offset=0&ordering=-name&name__icontains=a': {
    count: 7,
    results: [{
      id: 14,
      name: 'Vileta',
      natural_key: 'vileta'
    }, {
      id: 3,
      name: 'Cafe',
      natural_key: 'cafe'
    }, {
      id: 6,
      name: 'Blanco Invierno',
      natural_key: 'blanco-invierno'
    }, {
      id: 1,
      name: 'Blanco',
      natural_key: 'blanco'
    }]
  },
  'http://127.0.0.1:8000/colors/?limit=4&offset=4&ordering=-name&name__icontains=a': {
    count: 7,
    results: [{
      id: 9,
      name: 'Azul',
      natural_key: 'azul'
    }, {
      id: 4,
      name: 'Asabache',
      natural_key: 'asabache'
    }, {
      id: 5,
      name: 'Amarillo',
      natural_key: 'amarillo'
    }]
  },
  'http://127.0.0.1:8000/colors/?limit=4&offset=0&ordering=-name&name__icontains=a&id=1': {
    count: 1,
    results: [{
      id: 1,
      name: 'Blanco',
      natural_key: 'blanco'
    }]
  }
};