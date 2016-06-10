import React, { Component } from 'react'
import Header from './header'
import Main from './main'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class App extends Component {
  render() {
    return (
    	<MuiThemeProvider muiTheme={getMuiTheme()}>
	    	<div className="app">
	    		<Header />
	    		<Main />
	    	</div>
    	</MuiThemeProvider>
    )
  }
}