'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newDepartment;

describe('Department API:', function () {

  describe('GET /api/departments', function () {
    var departments;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/departments').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        departments = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(departments).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/departments', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/departments').send({
        name: 'New Department',
        info: 'This is the brand new department!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newDepartment = res.body;
        done();
      });
    });

    it('should respond with the newly created department', function () {
      expect(newDepartment.name).to.equal('New Department');
      expect(newDepartment.info).to.equal('This is the brand new department!!!');
    });
  });

  describe('GET /api/departments/:id', function () {
    var department;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/departments/' + newDepartment._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        department = res.body;
        done();
      });
    });

    afterEach(function () {
      department = {};
    });

    it('should respond with the requested department', function () {
      expect(department.name).to.equal('New Department');
      expect(department.info).to.equal('This is the brand new department!!!');
    });
  });

  describe('PUT /api/departments/:id', function () {
    var updatedDepartment;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/departments/' + newDepartment._id).send({
        name: 'Updated Department',
        info: 'This is the updated department!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedDepartment = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedDepartment = {};
    });

    it('should respond with the updated department', function () {
      expect(updatedDepartment.name).to.equal('Updated Department');
      expect(updatedDepartment.info).to.equal('This is the updated department!!!');
    });
  });

  describe('DELETE /api/departments/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/departments/' + newDepartment._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when department does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/departments/' + newDepartment._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=department.integration.js.map
