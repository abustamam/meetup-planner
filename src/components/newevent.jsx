import React from 'react'
import TextField from './textfield'
import GuestList from './guestlist'
import { create } from './../actions/eventactions'
import update from 'react-addons-update'
import _ from 'lodash'

/** New user creation screen
  * @extends React.Component
  */
class NewEvent extends React.Component {
    state = {
        newEvent: {},
        errorVisible: false
    }


    constructor(props) {
        super(props);
        this.displayName = 'NewEvent'
    }

    /**
     * handles changing of the event that is currently being created
     * @param {String} name - attribute name, e.g. "event name"
     * @param {String} value - value of prop, e.g. "bob's birthday"
     * @return {void}
     */

    handleChange(name, value) {
        const newObj = update(this.state.newEvent, {
            $merge: {[name]: value}
        })

        this.setState({
            newEvent: newObj,
            errorVisible: false
        })
    }

    /**
     * attempts to create a new event, throws an error if any required 
     * attributes are not filled in correctly
     * @param {syntheticEvent} e - the window event
     * @return {void}
     */

    tryCreate(e) {
        e.preventDefault()
        this.handleCreate()
        // const { name, email, password } = this.state.newEvent
        // if (name && email && password) {
        //     this.handleCreate()
        // } else {
        //     this.setState({errorVisible: true})
        //     // this.handleCreate()
        // }
    }

    /**
     * handles creation of new event
     * @return {void}
     */

    handleCreate() {
        const event = {
            ...this.state.newEvent
        }
        create(event)
        this.setState({newEvent: {}, errorVisible: false})
        this.props.setActiveTab('view all events')
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
        const { errorVisible, newEvent } = this.state
        return <div className="main">
            <form className="form" onSubmit={::this.tryCreate}>
                <span className="form-label">All fields required unless marked optional</span>
                <TextField 
                    autofocus={true}
                    required={true}
                    label="event name"
                    placeholder="e.g. John's Birthday"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['event name']}
                />
                <TextField 
                    required={true}
                    label="event host"
                    placeholder="e.g. birthday"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['event host']}
                />
                <TextField 
                    required={true}
                    label="event type"
                    placeholder="e.g. birthday"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['event type']}
                />
                <TextField 
                    required={true}
                    label="start time" 
                    placeholder="hh:mm"
                    type="datetime-local"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['start time']}
                />
                <TextField 
                    required={true}
                    label="end time" 
                    placeholder="hh:mm"
                    type="datetime-local"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['end time']}
                />
                <GuestList 
                    required={true}
                    label="guest list"
                    placeholder="e.g. John Doe"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['guest list']}
                />
                <TextField 
                    required={true}
                    label="location"
                    placeholder="e.g. My house"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['location']}
                />
                <TextField 
                    label="birthday"
                    placeholder="mm/dd/yyyy"
                    type="date"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['birthday']}
                />
                <button type="submit" className="submit">Create New Event</button>
            </form>
        </div>
    }
}

export default NewEvent