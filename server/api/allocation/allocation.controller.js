/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/allocations              ->  index
 * POST    /api/allocations              ->  create
 * GET     /api/allocations/:id          ->  show
 * PUT     /api/allocations/:id          ->  update
 * DELETE  /api/allocations/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.index = index;
exports.show = show;
exports.showProjectAllocations = showProjectAllocations;
exports.create = create;
exports.showtotal = showtotal;
exports.showWorkload = showWorkload;
exports.showWeeklyProjects = showWeeklyProjects;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = require("sequelize");

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

// Gets a list of Allocations
function index(req, res) {
  if (_lodash2.default.isEmpty(req.query)) {
    return _sqldb.Allocation.findAll().then(respondWithResult(res)).catch(handleError(res));
  } else {
    return _sqldb.Allocation.findAll({ where: {
        weekenum: req.query.weekenum,
        WorkerId: req.query.workerid }
    }).then(respondWithResult(res)).catch(handleError(res));
  }
}

// Gets a single Allocation from the DB
function show(req, res) {
  return _sqldb.Allocation.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

function showProjectAllocations(req, res) {
  return _sqldb.Allocation.findAll({
    where: {
      ProjectId: req.params.id
    },
    include: [_sqldb.Worker]
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Allocation in the DB
function create(req, res) {
  return _sqldb.Allocation.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

function showtotal(req, res) {
  return _sqldb.Allocation.sequelize.query('CALL GetTotalAllocations();').then(respondWithResult(res, 201)).catch(handleError(res));
}

function showWorkload(req, res) {
  return _sqldb.Allocation.sequelize.query('CALL GetWorkloadAllocations();').then(respondWithResult(res, 201)).catch(handleError(res));
}

function showWeeklyProjects(req, res) {
  return _sqldb.Allocation.findAll((0, _defineProperty3.default)({
    where: {
      weekenum: req.query.weekenum,
      WorkerId: req.query.workerid
    },
    include: [_sqldb.Worker]
  }, 'include', [_sqldb.Project])).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Allocation in the DB
function update(req, res) {

  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Allocation.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Allocation from the DB
function destroy(req, res) {
  return _sqldb.Allocation.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=allocation.controller.js.map
