'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newProject;

describe('Project API:', function () {

  describe('GET /api/projects', function () {
    var projects;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/projects').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        projects = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      expect(projects).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/projects', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/projects').send({
        name: 'New Project',
        info: 'This is the brand new project!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newProject = res.body;
        done();
      });
    });

    it('should respond with the newly created project', function () {
      expect(newProject.name).to.equal('New Project');
      expect(newProject.info).to.equal('This is the brand new project!!!');
    });
  });

  describe('GET /api/projects/:id', function () {
    var project;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/projects/' + newProject._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        project = res.body;
        done();
      });
    });

    afterEach(function () {
      project = {};
    });

    it('should respond with the requested project', function () {
      expect(project.name).to.equal('New Project');
      expect(project.info).to.equal('This is the brand new project!!!');
    });
  });

  describe('PUT /api/projects/:id', function () {
    var updatedProject;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/projects/' + newProject._id).send({
        name: 'Updated Project',
        info: 'This is the updated project!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedProject = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedProject = {};
    });

    it('should respond with the updated project', function () {
      expect(updatedProject.name).to.equal('Updated Project');
      expect(updatedProject.info).to.equal('This is the updated project!!!');
    });
  });

  describe('DELETE /api/projects/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/projects/' + newProject._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when project does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/projects/' + newProject._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});
//# sourceMappingURL=project.integration.js.map
