import AppDispatcher from './../dispatchers/dispatcher'
import UserConstants from './../constants/userconstants'
import UserStore from './../stores/userstore'

export function create(user) {
	AppDispatcher.dispatch({
		type: UserConstants.USER_CREATE,
		user
	})
}

export function update(id, user) {
	AppDispatcher.dispatch({
		type: UserConstants.USER_UPATE,
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