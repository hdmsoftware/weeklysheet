'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newAllocation;

describe('Allocation API:', function () {

  describe('GET /api/allocations', function () {
    var allocations;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/allocations').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        allocations = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(allocations).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/allocations', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/allocations').send({
        name: 'New Allocation',
        info: 'This is the brand new allocation!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newAllocation = res.body;
        done();
      });
    });

    it('should respond with the newly created allocation', function () {
      expect(newAllocation.name).to.equal('New Allocation');
      expect(newAllocation.info).to.equal('This is the brand new allocation!!!');
    });
  });

  describe('GET /api/allocations/:id', function () {
    var allocation;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/allocations/' + newAllocation._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        allocation = res.body;
        done();
      });
    });

    afterEach(function () {
      allocation = {};
    });

    it('should respond with the requested allocation', function () {
      expect(allocation.name).to.equal('New Allocation');
      expect(allocation.info).to.equal('This is the brand new allocation!!!');
    });
  });

  describe('PUT /api/allocations/:id', function () {
    var updatedAllocation;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/allocations/' + newAllocation._id).send({
        name: 'Updated Allocation',
        info: 'This is the updated allocation!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedAllocation = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedAllocation = {};
    });

    it('should respond with the updated allocation', function () {
      expect(updatedAllocation.name).to.equal('Updated Allocation');
      expect(updatedAllocation.info).to.equal('This is the updated allocation!!!');
    });
  });

  describe('DELETE /api/allocations/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/allocations/' + newAllocation._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when allocation does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/allocations/' + newAllocation._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=allocation.integration.js.map
