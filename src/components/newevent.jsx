import React from 'react'
import TextField from './textfield.jsx'
import { create } from './../actions/eventactions.js'
import update from 'react-addons-update'
import _ from 'lodash'

/** New user creation screen
  * @extends React.Component
  */
class NewEvent extends React.Component {

    static defaultProps = {
        allEvents: {}
    }

    static propTypes = {
        allEvents: React.PropTypes.object
    }

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
        const { name, email, password } = this.state.newEvent
        if (name && email && password) {
            this.handleCreate()
        } else {
            // this.setState({errorVisible: true})
            this.handleCreate()
        }
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
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
        const { errorVisible, newEvent } = this.state
        return <div className="main">
            <form className="form" onSubmit={::this.tryCreate}>
                <span><sup>*</sup>Required</span>
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
                    type="datetime"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['start time']}
                />
                <TextField 
                    required={true}
                    label="end time" 
                    placeholder="hh:mm"
                    type="datetime"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['end time']}
                />
                <TextField 
                    required={true}
                    label="guest list"
                    placeholder="e.g. Google"
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
                <button type="submit">Submit</button>
            </form>
        </div>
    }
}

export default NewEvent