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
	console.log(_users)
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

class UserStore extends EventEmitter {
	constructor(props) {
		super(props)
	}
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

const userStore = new UserStore()

AppDispatcher.register(action => {
	console.log(action)
	switch(action.type) {
		case UserConstants.USER_CREATE:
			console.log('CREATING', action.user)
			create(action.user)
			userStore.emitChange()
			break
		case UserConstants.USER_UPDATE:
			const user = action.user
			update(action.id, {user})
			userStore.emitChange()
			break
		case UserConstants.USER_DESTROY:
			destroy(action.id)
			userStore.emitChange()
			break
	}
})



export default userStore