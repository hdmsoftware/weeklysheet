'use strict';

// Production specific configuration
// =================================

module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080,

  // sequelize: {
  //   uri:  process.env.SEQUELIZE_URI ||
  //         'sqlite://',
  //   options: {
  //     logging: false,
  //     storage: 'dist.sqlite',
  //     define: {
  //       timestamps: false
  //     }
  //   }
  // }
  sequelize: {
    // uri: 'sqlite://',
    database: 'missioncontrol',
    username: 'haris',
    password: 'luTvFLzsut^6z^0',
    host: 'tkout-production.cc4bt1x2xebf.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    options: {
      logging: false,
      storage: '',
      define: {
        timestamps: false
      }
    }
  }
};
//# sourceMappingURL=production.js.map
