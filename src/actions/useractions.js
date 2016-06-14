import AppDispatcher from './../dispatchers/dispatcher'
import UserConstants from './../constants/userconstants'

export function create(user) {
	AppDispatcher.dispatch({
		type: UserConstants.USER_CREATE,
		user
	})
}

export function update(id, user) {
	AppDispatcher.dispatch({
		type: UserConstants.USER_UPDATE,
		id,
		user
	})
}

export function destroy(id) {
	AppDispatcher.dispatch({
		type: UserConstants.USER_DESTROY,
		id
	})
}