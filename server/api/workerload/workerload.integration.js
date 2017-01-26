'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newWorkerload;

describe('Workerload API:', function () {

  describe('GET /api/workerloads', function () {
    var workerloads;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/workerloads').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        workerloads = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(workerloads).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/workerloads', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/workerloads').send({
        name: 'New Workerload',
        info: 'This is the brand new workerload!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newWorkerload = res.body;
        done();
      });
    });

    it('should respond with the newly created workerload', function () {
      expect(newWorkerload.name).to.equal('New Workerload');
      expect(newWorkerload.info).to.equal('This is the brand new workerload!!!');
    });
  });

  describe('GET /api/workerloads/:id', function () {
    var workerload;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/workerloads/' + newWorkerload._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        workerload = res.body;
        done();
      });
    });

    afterEach(function () {
      workerload = {};
    });

    it('should respond with the requested workerload', function () {
      expect(workerload.name).to.equal('New Workerload');
      expect(workerload.info).to.equal('This is the brand new workerload!!!');
    });
  });

  describe('PUT /api/workerloads/:id', function () {
    var updatedWorkerload;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/workerloads/' + newWorkerload._id).send({
        name: 'Updated Workerload',
        info: 'This is the updated workerload!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedWorkerload = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedWorkerload = {};
    });

    it('should respond with the updated workerload', function () {
      expect(updatedWorkerload.name).to.equal('Updated Workerload');
      expect(updatedWorkerload.info).to.equal('This is the updated workerload!!!');
    });
  });

  describe('DELETE /api/workerloads/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/workerloads/' + newWorkerload._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when workerload does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/workerloads/' + newWorkerload._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=workerload.integration.js.map
