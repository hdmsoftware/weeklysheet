"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define("WorkerLoad", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    allocated: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weekenum: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        models.Workerload.belongsTo(models.Worker);
      }
    }
  });
};

;
//# sourceMappingURL=workerload.model.js.map
