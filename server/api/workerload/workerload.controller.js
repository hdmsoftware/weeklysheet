/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/workerloads              ->  index
 * POST    /api/workerloads              ->  create
 * GET     /api/workerloads/:id          ->  show
 * PUT     /api/workerloads/:id          ->  update
 * DELETE  /api/workerloads/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.showPerWorkerId = showPerWorkerId;
exports.showWorkloadByWeek = showWorkloadByWeek;
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

// Gets a list of Workerloads
function index(req, res) {
  return _sqldb.Workerload.findAll().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Workerload from the DB
function show(req, res) {
  return _sqldb.Workerload.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Workerload from the DB per workerid
function showPerWorkerId(req, res) {

  return _sqldb.Workerload.findAll({
    where: {
      WorkerId: req.params.workerid
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

function showWorkloadByWeek(req, res) {
  return _sqldb.Workerload.findAll({
    where: {
      "weekenum": req.query.weekenum,
      "WorkerId": req.query.workerid
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Workerload in the DB
function create(req, res) {
  return _sqldb.Workerload.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Workerload in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Workerload.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Workerload from the DB
function destroy(req, res) {
  return _sqldb.Workerload.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=workerload.controller.js.map
