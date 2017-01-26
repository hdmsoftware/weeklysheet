/**
 * Holiday model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var Holiday = require('../../sqldb').Holiday;
var HolidayEvents = new _events.EventEmitter();

// Set max event listeners (0 == unlimited)
HolidayEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Holiday.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    HolidayEvents.emit(event + ':' + doc._id, doc);
    HolidayEvents.emit(event, doc);
    done(null);
  };
}

exports.default = HolidayEvents;
//# sourceMappingURL=holiday.events.js.map
