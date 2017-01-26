
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {

  return sequelize.define("Project", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        models.Project.hasMany(models.Allocation);
        models.Project.belongsTo(models.Client);
      }
    }
  });
};

;
//# sourceMappingURL=project.model.js.map
