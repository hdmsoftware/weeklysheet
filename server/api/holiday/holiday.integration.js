'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newHoliday;

describe('Holiday API:', function () {

  describe('GET /api/holidays', function () {
    var holidays;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/holidays').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        holidays = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(holidays).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/holidays', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/holidays').send({
        name: 'New Holiday',
        info: 'This is the brand new holiday!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newHoliday = res.body;
        done();
      });
    });

    it('should respond with the newly created holiday', function () {
      expect(newHoliday.name).to.equal('New Holiday');
      expect(newHoliday.info).to.equal('This is the brand new holiday!!!');
    });
  });

  describe('GET /api/holidays/:id', function () {
    var holiday;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/holidays/' + newHoliday._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        holiday = res.body;
        done();
      });
    });

    afterEach(function () {
      holiday = {};
    });

    it('should respond with the requested holiday', function () {
      expect(holiday.name).to.equal('New Holiday');
      expect(holiday.info).to.equal('This is the brand new holiday!!!');
    });
  });

  describe('PUT /api/holidays/:id', function () {
    var updatedHoliday;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/holidays/' + newHoliday._id).send({
        name: 'Updated Holiday',
        info: 'This is the updated holiday!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedHoliday = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedHoliday = {};
    });

    it('should respond with the updated holiday', function () {
      expect(updatedHoliday.name).to.equal('Updated Holiday');
      expect(updatedHoliday.info).to.equal('This is the updated holiday!!!');
    });
  });

  describe('DELETE /api/holidays/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/holidays/' + newHoliday._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when holiday does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/holidays/' + newHoliday._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=holiday.integration.js.map
