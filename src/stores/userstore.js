const EventEmitter = require('events').EventEmitter
import _ from 'lodash'
import uuid from 'uuid'
import UserConstants from './../constants/userconstants'
import AppDispatcher from './../dispatchers/dispatcher'

const CHANGE_EVENT = 'change'

const _users = {}

function create(user) {
	const id = uuid.v4()
	_users[id] = {
		id: id,
		...user
	}
}

function update(id, updates) {
	_users[id] = _.assign({}, _users[id], updates)
}

function updateAll(updates) {
	_.forEach(_todos, (todo, id) => {
		update(id, updates)
	})
}

function destroy(id) {
  _.unset(_users, id)
}

AppDispatcher.register(action => {
	let text

	switch(action.actionType) {
		case UserConstants.USER_CREATE:
			text = _.trim(action.text)
			if (text) {
				create(text)
				UserStore.emitChange()
			}
			break
		case UserConstants.USER_UPDATE:
			text = _.trim(action.text)
			if (text) {
				update(action.id, {text})
				UserStore.emitChange()
			}
			break
		case UserConstants.USER_DESTROY:
			destroy(action.id)
			UserStore.emitChange()
			break
	}
})

export default class UserStore extends EventEmitter {
	getAll() {
		return _users
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