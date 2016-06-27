import React from 'react'
import update from 'react-addons-update'
import _ from 'lodash'
import Validation from 'react-validation'
import validator from 'validator'
import classnames from 'classnames'
import { create } from './../actions/eventactions'
import TextField from './textfield'
import TextArea from './textarea'
import GuestList from './guestlist'
import InputGroup from './inputgroup'

Validation.extendErrors({
    isRequired: {
        message: 'Required',
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    }
})

/** New user creation screen
  * @extends React.Component
  */
class NewEvent extends React.Component {
    state = {
        newEvent: {}
    }

    constructor(props) {
        super(props);
        this.displayName = 'NewEvent'
    }

    /**
     * handles changing of the event that is currently being created
     * @param {Event} e - Synthetic event
     * @return {void}
     */

    handleChange(e) {
        const label = e.target.name
        const value = e.target.value
        const newObj = update(this.state.newEvent, {
            $merge: {[label]: value}
        })

        console.log(label,value, newObj)

        this.setState({
            newEvent: newObj
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
        console.log(startTime, endTime)
        return startTime < endTime
    }

    /**
     * attempts to create a new event, throws an error if any required 
     * attributes are not filled in correctly
     * @param {syntheticEvent} e - the window event
     * @return {void}
     */

    tryCreate(e) {
        e.preventDefault()
        const { newEvent } = this.state
        const { name, host, type, start, end, guests } = this.state.newEvent
        if ( name && host && type && start && end && guests && guests.length) {
                this.handleCreate()
        } else {
            this.form.forceValidate(true)
        }
    }

    /**
     * handle blur
     * @param {String} label - attribute name, e.g. "email"
     */

    handleBlur(label) {
        this.setState({focus: null})
        const component = this[label]
        if (!component) return
        if (!component.state.value) {
            component.showError('Required')
        }
    }

    /**
     * handles creation of new event
     * @return {void}
     */

    handleCreate() {
        create(this.state.newEvent)
        this.setState({newEvent: {}})
        this.props.setActiveTab('view all events')
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
        const { newEvent } = this.state

        const eventType = _.toLower(newEvent.type)

        const inputGroupClass = label => {
            return classnames({
                'input-group': true,
                'input-group-focus': this.state.focus === label
            })
        }
        const inputLabelClass = label => {
            return classnames({
                'input-label': true,
                'input-label-focus': this.state.focus === label
            })
        }
        const inputClass = label => {
            return classnames({
                'input': true,
                'input-focus': this.state.focus === label
            })  
        } 

        return <div className="main">
            <Validation.Form onSubmit={::this.tryCreate} ref={c => this.form = c}>
                <span className="form-label">All fields required unless marked optional</span>
                <div className={inputGroupClass('name')}>
                    <label className={inputLabelClass('name')}>
                        Event Name
                    </label>
                    <Validation.Input
                        ref={c => this.name = c}
                        name='name'
                        wrapper={{component: InputGroup}}
                        type='text'
                        autoFocus={true}
                        placeholder="e.g. John's Birthday"
                        blocking='input'
                        icon='label'
                        containerClassName={inputClass('name')}
                        onFocus={()=>this.setState({focus: 'name'})}
                        onBlur={()=>this.handleBlur('name')}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'name'}
                        validations={[{
                            rule: 'isRequired'
                        }]}
                    />
                </div>
                <div className={inputGroupClass('host')}>
                    <label className={inputLabelClass('host')}>
                        Event Host
                    </label>
                    <Validation.Input
                        ref={c => this.host = c}
                        name='host'
                        wrapper={{component: InputGroup}}
                        type='host'
                        placeholder="e.g. John"
                        blocking='input'
                        icon='person'
                        containerClassName={inputClass('host')}
                        onFocus={()=>this.setState({focus: 'host'})}
                        onBlur={()=>this.handleBlur('host')}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'host'}
                        validations={[{
                            rule: 'isRequired'
                        }]}
                    />
                </div>
                <div className={inputGroupClass('type')}>
                    <label className={inputLabelClass('type')}>
                        Event Type
                    </label>
                    <Validation.Input
                        ref={c => this.type = c}
                        name='type'
                        wrapper={{component: InputGroup}}
                        type='type'
                        placeholder="e.g. birthday"
                        blocking='input'
                        icon={eventType}
                        containerClassName={inputClass('type')}
                        onFocus={()=>this.setState({focus: 'type'})}
                        onBlur={()=>this.handleBlur('type')}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'type'}
                        validations={[{
                            rule: 'isRequired'
                        }]}
                    />
                </div>
                <div className={inputGroupClass('location')}>
                    <label className={inputLabelClass('location')}>
                        Event Location
                    </label>
                    <Validation.Input
                        ref={c => this.location = c}
                        name='location'
                        wrapper={{component: InputGroup}}
                        type='location'
                        placeholder="e.g. John's house"
                        blocking='input'
                        icon='pin'
                        containerClassName={inputClass('location')}
                        onFocus={()=>this.setState({focus: 'location'})}
                        onBlur={()=>this.handleBlur('location')}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'location'}
                        validations={[{
                            rule: 'isRequired'
                        }]}
                    />
                </div>
                <GuestList 
                    handleChange={::this.handleChange}
                    guests={newEvent.guests}
                />
                <TextArea 
                    label="message to guests"
                    placeholder="e.g. Bring a snack!"
                    handleChange={::this.handleChange}
                    value={newEvent.message}
                />
                <Validation.Button blocking="button" className="submit" disabledClassName="submit-disabled" disabled={false} value="Create New User" />
            </Validation.Form>
        </div>
    }

    // render() {
    //     const { errorVisible, newEvent } = this.state
    //     const eventType = _.toLower(newEvent['event type'])
    //     let typeIcon = <Circle/>

    //     if (eventType === 'birthday') {
    //         typeIcon = <Cake/>
    //     }
    //     if (eventType === 'party') {
    //         typeIcon = <Party/>
    //     }
    //     if (eventType === 'work') {
    //         typeIcon = <Office/>
    //     }

    //     return <div className="main">
    //         <form className="form" onSubmit={::this.tryCreate} ref={c => this.form = c}>
    //             <span className="form-label">All fields required unless marked optional</span>
    //             <TextField 
    //                 autofocus={true}
    //                 required={true}
    //                 label="event name"
    //                 placeholder="e.g. John's Birthday"
    //                 handleChange={::this.handleChange}
    //                 errorVisible={errorVisible}
    //                 value={newEvent['event name']}
    //             ><Label/></TextField>
    //             <TextField 
    //                 required={true}
    //                 label="event host"
    //                 placeholder="e.g. John"
    //                 handleChange={::this.handleChange}
    //                 errorVisible={errorVisible}
    //                 value={newEvent['event host']}
    //             ><Person/></TextField>
    //             <TextField 
    //                 required={true}
    //                 label="event type"
    //                 placeholder="e.g. birthday"
    //                 handleChange={::this.handleChange}
    //                 errorVisible={errorVisible}
    //                 value={newEvent['event type']}
    //             >{typeIcon}</TextField>
    //             <TextField 
    //                 required={true}
    //                 label="location"
    //                 placeholder="e.g. John's house"
    //                 handleChange={::this.handleChange}
    //                 errorVisible={errorVisible}
    //                 value={newEvent['location']}
    //             ><Pin/></TextField>
    //             <Times 
    //                 checkDate={::this.checkDate}
    //                 handleChange={::this.handleChange}
    //                 errorVisible={errorVisible}
    //                 startTime={newEvent['start time']}
    //                 endTime={newEvent['end time']}
    //             />
                // <GuestList 
                //     handleChange={::this.handleChange}
                //     errorVisible={errorVisible}
                //     guests={newEvent['guests']}
                // />
    //             <TextArea 
    //                 label="message to guests"
    //                 placeholder="e.g. Bring a snack!"
    //                 handleChange={::this.handleChange}
    //                 value={newEvent['message to guests']}
    //             ><Email/></TextArea>
    //             <button type="submit" className="submit">Create New Event</button>
    //         </form>
    //     </div>
    // }
}

export default NewEvent