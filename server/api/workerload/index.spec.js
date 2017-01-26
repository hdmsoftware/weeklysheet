'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var workerloadCtrlStub = {
  index: 'workerloadCtrl.index',
  show: 'workerloadCtrl.show',
  create: 'workerloadCtrl.create',
  update: 'workerloadCtrl.update',
  destroy: 'workerloadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var workerloadIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './workerload.controller': workerloadCtrlStub
});

describe('Workerload API Router:', function () {

  it('should return an express router instance', function () {
    expect(workerloadIndex).to.equal(routerStub);
  });

  describe('GET /api/workerloads', function () {

    it('should route to workerload.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'workerloadCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/workerloads/:id', function () {

    it('should route to workerload.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'workerloadCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/workerloads', function () {

    it('should route to workerload.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'workerloadCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/workerloads/:id', function () {

    it('should route to workerload.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'workerloadCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/workerloads/:id', function () {

    it('should route to workerload.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'workerloadCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/workerloads/:id', function () {

    it('should route to workerload.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'workerloadCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
