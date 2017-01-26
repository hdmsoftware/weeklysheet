'use strict';

// Development specific configuration
// ==================================

module.exports = {

  // Sequelize connection opions
  // sequelize: {
  //  // uri: 'sqlite://',
  //   database:'timesheet',
  //   username:'root',
  //   password:'achieve',
  //   host: '127.0.0.1',
  //   dialect: 'mysql',
  //   options: {
  //     logging: false,
  //     storage: 'dev.sqlite',
  //     define: {
  //       timestamps: false
  //     }
  //   }
  // },
  // sequelize: {
  //  // uri: 'sqlite://',
  //   database:'heroku_533e2f6b30a499f',
  //   username:'b2e1a5608e9d52',
  //   password:'7c031729',
  //   host: 'us-cdbr-iron-east-04.cleardb.net',
  //   dialect: 'mysql',
  //   options: {
  //     logging: false,
  //     storage: '',
  //     define: {
  //       timestamps: false
  //     }
  //   }
  // },
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
  },

  // Seed database on startup
  seedDB: false

};
//# sourceMappingURL=development.js.map
