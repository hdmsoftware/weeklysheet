'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var clientCtrlStub = {
  index: 'clientCtrl.index',
  show: 'clientCtrl.show',
  create: 'clientCtrl.create',
  update: 'clientCtrl.update',
  destroy: 'clientCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var clientIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './client.controller': clientCtrlStub
});

describe('Client API Router:', function () {

  it('should return an express router instance', function () {
    expect(clientIndex).to.equal(routerStub);
  });

  describe('GET /api/clients', function () {

    it('should route to client.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'clientCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/clients/:id', function () {

    it('should route to client.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'clientCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/clients', function () {

    it('should route to client.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'clientCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/clients/:id', function () {

    it('should route to client.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'clientCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/clients/:id', function () {

    it('should route to client.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'clientCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/clients/:id', function () {

    it('should route to client.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'clientCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
