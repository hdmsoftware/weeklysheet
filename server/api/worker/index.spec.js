'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var workerCtrlStub = {
  index: 'workerCtrl.index',
  show: 'workerCtrl.show',
  create: 'workerCtrl.create',
  update: 'workerCtrl.update',
  destroy: 'workerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var workerIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './worker.controller': workerCtrlStub
});

describe('Worker API Router:', function () {

  it('should return an express router instance', function () {
    expect(workerIndex).to.equal(routerStub);
  });

  describe('GET /api/workers', function () {

    it('should route to worker.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'workerCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/workers/:id', function () {

    it('should route to worker.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'workerCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/workers', function () {

    it('should route to worker.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'workerCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/workers/:id', function () {

    it('should route to worker.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'workerCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/workers/:id', function () {

    it('should route to worker.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'workerCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/workers/:id', function () {

    it('should route to worker.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'workerCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
