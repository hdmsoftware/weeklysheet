'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var holidayCtrlStub = {
  index: 'holidayCtrl.index',
  show: 'holidayCtrl.show',
  create: 'holidayCtrl.create',
  update: 'holidayCtrl.update',
  destroy: 'holidayCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var holidayIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './holiday.controller': holidayCtrlStub
});

describe('Holiday API Router:', function () {

  it('should return an express router instance', function () {
    expect(holidayIndex).to.equal(routerStub);
  });

  describe('GET /api/holidays', function () {

    it('should route to holiday.controller.index', function () {
      expect(routerStub.get.withArgs('/', 'holidayCtrl.index')).to.have.been.calledOnce;
    });
  });

  describe('GET /api/holidays/:id', function () {

    it('should route to holiday.controller.show', function () {
      expect(routerStub.get.withArgs('/:id', 'holidayCtrl.show')).to.have.been.calledOnce;
    });
  });

  describe('POST /api/holidays', function () {

    it('should route to holiday.controller.create', function () {
      expect(routerStub.post.withArgs('/', 'holidayCtrl.create')).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/holidays/:id', function () {

    it('should route to holiday.controller.update', function () {
      expect(routerStub.put.withArgs('/:id', 'holidayCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/holidays/:id', function () {

    it('should route to holiday.controller.update', function () {
      expect(routerStub.patch.withArgs('/:id', 'holidayCtrl.update')).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/holidays/:id', function () {

    it('should route to holiday.controller.destroy', function () {
      expect(routerStub.delete.withArgs('/:id', 'holidayCtrl.destroy')).to.have.been.calledOnce;
    });
  });
});
//# sourceMappingURL=index.spec.js.map
