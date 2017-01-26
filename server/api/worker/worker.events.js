/**
 * Worker model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Worker = require('../../sqldb').Worker;
var WorkerEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
WorkerEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Worker.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    WorkerEvents.emit(event + ':' + doc._id, doc);
    WorkerEvents.emit(event, doc);
    done(null);
  };
}

exports.default = WorkerEvents;
//# sourceMappingURL=worker.events.js.map
