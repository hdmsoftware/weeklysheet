'use strict';

var express = require('express');
var controller = require('./allocation.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/total/allocation', controller.showtotal);
router.get('/workload/allocation', controller.showWorkload);
router.get('/weekly/allocation', controller.showWeeklyProjects);
router.get('/project/:id', controller.showProjectAllocations);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
