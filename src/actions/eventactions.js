import AppDispatcher from './../dispatchers/dispatcher'
import EventConstants from './../constants/eventconstants'

export function create(event) {
	AppDispatcher.dispatch({
		type: EventConstants.EVENT_CREATE,
		event
	})
}

export function update(id, event) {
	AppDispatcher.dispatch({
		type: EventConstants.EVENT_UPDATE,
		id,
		event
	})
}

export function destroy(id) {
	AppDispatcher.dispatch({
		type: EventConstants.EVENT_DESTROY,
		id
	})
}