'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Holiday', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    actualdate: {
      type: DataTypes.DATE,
      unique: true,
      allowNull: false
    },
    weekenum: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
//# sourceMappingURL=holiday.model.js.map
