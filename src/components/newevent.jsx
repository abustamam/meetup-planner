import React from 'react'
import update from 'react-addons-update'
import _ from 'lodash'
import TextField from './textfield'
import TextArea from './textarea'
import GuestList from './guestlist'
import { create } from './../actions/eventactions'
import Label from './icons/label'
import Person from './icons/person'
import Circle from './icons/circle'
import Cake from './icons/cake'
import Party from './icons/party'
import Office from './icons/office'
import BeginTime from './icons/begintime'
import EndTime from './icons/endtime'
import Pin from './icons/pin'
import Email from './icons/email'

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

    componentDidMount() {
        this.form.addEventListener('invalid', e => this.tryCreate(e), true)
    }

    componentWillUnmount() {
        this.form.removeEventListener('invalid')
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
     * checks if dates/times are valid
     * @return {boolean}
     */

    checkDate() {
        const { newEvent } = this.state
        const startTime = newEvent['start time']
        const endTime = newEvent['end time']
        return startTime && endTime && startTime < endTime
    }

    /**
     * attempts to create a new event, throws an error if any required 
     * attributes are not filled in correctly
     * @param {syntheticEvent} e - the window event
     * @return {void}
     */

    tryCreate(e) {
        e.preventDefault()
        // this.handleCreate()
        const { newEvent } = this.state
        if ( newEvent['event name'] && newEvent['event host'] && newEvent['event type'] &&
             newEvent.location && newEvent['start time'] && newEvent['end time'] &&
             newEvent.guests && newEvent.guests.length) {
                this.handleCreate()
        } else {
            this.setState({errorVisible: true})
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
        this.props.setActiveTab('view all events')
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
        const { errorVisible, newEvent } = this.state
        const eventType = _.toLower(newEvent['event type'])
        let typeIcon = <Circle/>

        if (eventType === 'birthday') {
            typeIcon = <Cake/>
        }
        if (eventType === 'party') {
            typeIcon = <Party/>
        }
        if (eventType === 'work') {
            typeIcon = <Office/>
        }

        return <div className="main">
            <form className="form" onSubmit={::this.tryCreate} ref={c => this.form = c}>
                <span className="form-label">All fields required unless marked optional</span>
                <TextField 
                    autofocus={true}
                    required={true}
                    label="event name"
                    placeholder="e.g. John's Birthday"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['event name']}
                ><Label/></TextField>
                <TextField 
                    required={true}
                    label="event host"
                    placeholder="e.g. John"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['event host']}
                ><Person/></TextField>
                <TextField 
                    required={true}
                    label="event type"
                    placeholder="e.g. birthday"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['event type']}
                >{typeIcon}</TextField>
                <TextField 
                    required={true}
                    label="location"
                    placeholder="e.g. John's house"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['location']}
                ><Pin/></TextField>
                <TextField 
                    required={true}
                    label="start time" 
                    placeholder="hh:mm"
                    type="datetime-local"
                    checkDate={::this.checkDate}
                    errorText="Start time is invalid"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['start time']}
                ><BeginTime/></TextField>
                <TextField 
                    required={true}
                    label="end time" 
                    placeholder="hh:mm"
                    type="datetime-local"
                    checkDate={::this.checkDate}
                    errorText="End time is invalid"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newEvent['end time']}
                ><EndTime/></TextField>
                <GuestList 
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    guests={newEvent['guests']}
                />
                <TextArea 
                    label="message to guests"
                    placeholder="e.g. Bring a snack!"
                    handleChange={::this.handleChange}
                    value={newEvent['message to guests']}
                ><Email/></TextArea>
                <button type="submit" className="submit">Create New Event</button>
            </form>
        </div>
    }
}

export default NewEvent