import React, { Component } from 'react'
import Header from './header'
import Main from './main'
import userStore from './../stores/userstore.js'
require('./../lib/tota11y.min.js')
/**
 * Gets the current userStore and returns all users
 * @return {Object}
 */
function getUserState() {
  return {
    allUsers: userStore.getAll()
  }
}

/** The entire app
  * @extends React.Component
  */

export default class App extends Component {

  state = getUserState()

  constructor(props) {
    super(props)
  }

  /*
   * adds a change listener to the userStore
   * @return {void}
   */

  componentDidMount() {
      userStore.addChangeListener(::this._onChange)
  }

  /*
   * ensures that listeners are destroyed when component is unmounted
   * @return {void}
   */  

  componentWillUnmount() {
      userStore.removeChangeListener(::this._onChange)  
  }

  /**
   * handles creation of new user
   * @return {void}
   */

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

  /**
   * sets state to the current contents of userStore.allUsers
   * @return {void}
   */

  _onChange() {
    this.setState(getUserState())
  }
}