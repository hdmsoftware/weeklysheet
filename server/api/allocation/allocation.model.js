'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define("Allocation", {
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
        models.Allocation.belongsTo(models.Project);
        models.Allocation.belongsTo(models.Worker);
      }
    }
  });
};

;
//# sourceMappingURL=allocation.model.js.map
