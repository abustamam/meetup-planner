import React, { Component } from 'react'
import Header from './header'
import Main from './main'
import userStore from './../stores/userstore.js'

function getUserState() {
  return {
    allUsers: userStore.getAll()
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = getUserState()
  }

  componentDidMount() {
      userStore.addChangeListener(this._onChange)
  }

  componentWillMount() {
      userStore.removeChangeListener(this._onChange)  
  }

  render() {
    return (
    	<div className="app">
    		<Header />
    		<Main 
          allUsers={this.state.allUsers}
        />
    	</div>
    )
  }

  _onChange() {
    this.setState(getUserState())
  }
}