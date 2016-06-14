const EventEmitter = require('events').EventEmitter
import _ from 'lodash'
import uuid from 'uuid'
import EventConstants from './../constants/eventconstants'
import AppDispatcher from './../dispatchers/dispatcher'

const CHANGE_EVENT = 'change'

const _events = {}

function create(event) {
	const id = uuid.v4()
	_events[id] = {
		id: id,
		...event
	}
}

function update(id, updates) {
	_events[id] = _.assign({}, _events[id], updates)
}

function updateAll(updates) {
	_.forEach(_todos, (todo, id) => {
		update(id, updates)
	})
}

function destroy(id) {
  _.unset(_events, id)
}

class EventStore extends EventEmitter {
	constructor(props) {
		super(props)
	}
	getAll() {
		return _events
	}

	emitChange() {
		this.emit(CHANGE_EVENT)
	}

	addChangeListener(cb) {
		this.on(CHANGE_EVENT, cb)
	}

	removeChangeListener(cb) {
		this.removeListener(CHANGE_EVENT, cb)
	}
}

const eventStore = new EventStore()

AppDispatcher.register(action => {
	switch(action.type) {
		case EventConstants.EVENT_CREATE:
			console.log('CREATING', action.event)
			create(action.event)
			eventStore.emitChange()
			break
		case EventConstants.EVENT_UPDATE:
			const event = action.event
			console.log('UPDATING', event.name)
			update(action.id, {event})
			eventStore.emitChange()
			break
		case EventConstants.EVENTDESTROY:
			destroy(action.id)
			eventStore.emitChange()
			break
	}
})



export default eventStore