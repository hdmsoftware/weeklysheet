

"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require(path.join(__dirname, '..', 'config', '/environment'));

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize)
};

// Insert models below
db.Holiday = db.sequelize.import('../api/holiday/holiday.model');
db.Client = db.sequelize.import('../api/client/client.model');
db.Department = db.sequelize.import('../api/department/department.model');
db.Allocation = db.sequelize.import('../api/allocation/allocation.model');
db.Project = db.sequelize.import('../api/project/project.model');
db.Worker = db.sequelize.import('../api/worker/worker.model');
db.Workerload = db.sequelize.import('../api/workerload/workerload.model');

(0, _keys2.default)(db).forEach(function (modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
//# sourceMappingURL=index.js.map
