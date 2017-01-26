'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var departmentCtrlStub = {
  index: 'departmentCtrl.index',
  show: 'departmentCtrl.show',
  create: 'departmentCtrl.create',
  update: 'departmentCtrl.update',
  destroy: 'departmentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var departmentIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './department.controller': departmentCtrlStub
});

describe('Department API Router:', function () {

  it('should return an express router instance', function () {
    expect(departmentIndex).to.equal(routerStub);
  });

  describe('GET /api/departments', function () {

    it('should route to department.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'departmentCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/departments/:id', function () {

    it('should route to department.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'departmentCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/departments', function () {

    it('should route to department.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'departmentCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/departments/:id', function () {

    it('should route to department.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'departmentCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/departments/:id', function () {

    it('should route to department.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'departmentCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/departments/:id', function () {

    it('should route to department.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'departmentCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
