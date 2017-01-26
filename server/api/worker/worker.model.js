
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define("Worker", {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        models.Worker.hasMany(models.Allocation);
        models.Worker.belongsTo(models.Department);
      }
    }
  });
};

;
//# sourceMappingURL=worker.model.js.map
