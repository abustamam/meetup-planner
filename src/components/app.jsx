import React, { Component } from 'react'
import Header from './header'
import Main from './main'
import userStore from './../stores/userstore'
import eventStore from './../stores/eventstore'
import _ from 'lodash'
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

function getEventState() {
  return {
    allEvents: eventStore.getAll()
  }
}

/** The entire app
  * @extends React.Component
  */

export default class App extends Component {

  state = _.assign({}, getUserState(), getEventState())

  constructor(props) {
    super(props)
  }

  /*
   * adds a change listener to the userStore
   * @return {void}
   */

  componentDidMount() {
      userStore.addChangeListener(::this._onChange)
      eventStore.addChangeListener(::this._onChange)
  }

  /*
   * ensures that listeners are destroyed when component is unmounted
   * @return {void}
   */  

  componentWillUnmount() {
      userStore.removeChangeListener(::this._onChange)
      eventStore.removeChangeListener(::this._onChange)    
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
          allEvents={this.state.allEvents}
        />
    	</div>
    )
  }

  /**
   * sets state to the current contents of userStore._users and eventStore._events
   * @return {void}
   */

  _onChange() {
    this.setState(_.assign({}, getUserState(), getEventState()))
  }
}