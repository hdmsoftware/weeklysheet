'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newWorker;

describe('Worker API:', function () {

  describe('GET /api/workers', function () {
    var workers;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/workers').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        workers = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(workers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/workers', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/workers').send({
        name: 'New Worker',
        info: 'This is the brand new worker!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newWorker = res.body;
        done();
      });
    });

    it('should respond with the newly created worker', function () {
      expect(newWorker.name).to.equal('New Worker');
      expect(newWorker.info).to.equal('This is the brand new worker!!!');
    });
  });

  describe('GET /api/workers/:id', function () {
    var worker;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/workers/' + newWorker._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        worker = res.body;
        done();
      });
    });

    afterEach(function () {
      worker = {};
    });

    it('should respond with the requested worker', function () {
      expect(worker.name).to.equal('New Worker');
      expect(worker.info).to.equal('This is the brand new worker!!!');
    });
  });

  describe('PUT /api/workers/:id', function () {
    var updatedWorker;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/workers/' + newWorker._id).send({
        name: 'Updated Worker',
        info: 'This is the updated worker!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedWorker = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedWorker = {};
    });

    it('should respond with the updated worker', function () {
      expect(updatedWorker.name).to.equal('Updated Worker');
      expect(updatedWorker.info).to.equal('This is the updated worker!!!');
    });
  });

  describe('DELETE /api/workers/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/workers/' + newWorker._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when worker does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/workers/' + newWorker._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=worker.integration.js.map
