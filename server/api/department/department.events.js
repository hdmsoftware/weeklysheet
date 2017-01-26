/**
 * Department model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Department = require('../../sqldb').Department;
var DepartmentEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
DepartmentEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Department.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    DepartmentEvents.emit(event + ':' + doc._id, doc);
    DepartmentEvents.emit(event, doc);
    done(null);
  };
}

exports.default = DepartmentEvents;
//# sourceMappingURL=department.events.js.map
