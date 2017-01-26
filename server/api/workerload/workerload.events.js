/**
 * Workerload model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Workerload = require('../../sqldb').Workerload;
var WorkerloadEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
WorkerloadEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Workerload.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    WorkerloadEvents.emit(event + ':' + doc._id, doc);
    WorkerloadEvents.emit(event, doc);
    done(null);
  };
}

exports.default = WorkerloadEvents;
//# sourceMappingURL=workerload.events.js.map
