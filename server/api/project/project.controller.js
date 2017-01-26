/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/projects              ->  index
 * POST    /api/projects              ->  create
 * GET     /api/projects/:id          ->  show
 * PUT     /api/projects/:id          ->  update
 * DELETE  /api/projects/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;
exports.showTotal = showTotal;
exports.showTotalByWorker = showTotalByWorker;

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

// Gets a list of Projects
function index(req, res) {
  return _sqldb.Project.findAll({ include: [_sqldb.Client], order: "name ASC" }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Project from the DB
function show(req, res) {
  return _sqldb.Project.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Project in the DB
function create(req, res) {
  return _sqldb.Project.create(req.body).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Updates an existing Project in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Project.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Project from the DB
function destroy(req, res) {
  return _sqldb.Project.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

function showTotal(req, res) {
  return _sqldb.Project.sequelize.query('CALL GetTotalProjects();').then(respondWithResult(res, 201)).catch(handleError(res));
}

function showTotalByWorker(req, res) {
  return _sqldb.Project.sequelize.query('CALL GetTotalProjectsByWorker();').then(respondWithResult(res, 201)).catch(handleError(res));
}
//# sourceMappingURL=project.controller.js.map
