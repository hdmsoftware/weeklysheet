/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/workers              ->  index
 * POST    /api/workers              ->  create
 * GET     /api/workers/:id          ->  show
 * PUT     /api/workers/:id          ->  update
 * DELETE  /api/workers/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.index1 = index1;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    return entity.updateAttributes(updates).then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.destroy().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Workers
function index(req, res) {
  return _sqldb.Worker.findAll({ include: [_sqldb.Department], order: "firstname ASC" }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a list of Workers
function index1(req, res) {
  return _sqldb.Worker.findAll().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Worker from the DB
function show(req, res) {
  return _sqldb.Worker.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Worker in the DB
function create(req, res) {
  return _sqldb.Worker.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Worker in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Worker.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Worker from the DB
function destroy(req, res) {
  return _sqldb.Worker.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=worker.controller.js.map
