/**
 * Main application routes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // Insert routes below
  app.use('/api/holidays', require('./api/holiday'));
  app.use('/api/clients', require('./api/client'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/workerloads', require('./api/workerload'));
  app.use('/api/allocations', require('./api/allocation'));
  app.use('/api/projects', require('./api/project'));
  app.use('/api/workers', require('./api/worker'));
  app.use('/api/users', require('./api/user'));

  //app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
  });
};

var _errors = require('./components/errors');

var _errors2 = _interopRequireDefault(_errors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
