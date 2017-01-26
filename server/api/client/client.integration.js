'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newClient;

describe('Client API:', function () {

  describe('GET /api/clients', function () {
    var clients;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/clients').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        clients = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(clients).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/clients', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/clients').send({
        name: 'New Client',
        info: 'This is the brand new client!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newClient = res.body;
        done();
      });
    });

    it('should respond with the newly created client', function () {
      expect(newClient.name).to.equal('New Client');
      expect(newClient.info).to.equal('This is the brand new client!!!');
    });
  });

  describe('GET /api/clients/:id', function () {
    var client;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/clients/' + newClient._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        client = res.body;
        done();
      });
    });

    afterEach(function () {
      client = {};
    });

    it('should respond with the requested client', function () {
      expect(client.name).to.equal('New Client');
      expect(client.info).to.equal('This is the brand new client!!!');
    });
  });

  describe('PUT /api/clients/:id', function () {
    var updatedClient;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/clients/' + newClient._id).send({
        name: 'Updated Client',
        info: 'This is the updated client!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedClient = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedClient = {};
    });

    it('should respond with the updated client', function () {
      expect(updatedClient.name).to.equal('Updated Client');
      expect(updatedClient.info).to.equal('This is the updated client!!!');
    });
  });

  describe('DELETE /api/clients/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/clients/' + newClient._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when client does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/clients/' + newClient._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=client.integration.js.map
