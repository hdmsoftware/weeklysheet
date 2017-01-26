'use strict';

var express = require('express');
var controller = require('./project.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/total/projects', controller.showTotal);
router.get('/worker/projects', controller.showTotalByWorker);

module.exports = router;
//# sourceMappingURL=index.js.map
