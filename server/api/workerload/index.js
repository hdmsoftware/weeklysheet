'use strict';

var express = require('express');
var controller = require('./workerload.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/worker/:workerid', controller.showPerWorkerId);
router.get('/worker/week/allocation', controller.showWorkloadByWeek);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
