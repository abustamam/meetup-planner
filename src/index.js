import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import { AppContainer } from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
require('./stylesheets/main.sass')

injectTapEventPlugin()
ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById('root'))

if (module.hot) {
	module.hot.accept('./components/app', () => {
		ReactDOM.render(<AppContainer component={require('./components/app').default} />, document.getElementById('root'))
	})
}