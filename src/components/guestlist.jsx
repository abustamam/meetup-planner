import React from 'react'
import Person from './icons/person'
import PersonOutline from './icons/personoutline'
import classnames from 'classnames'

/** Guest list input
  * @extends React.Component
  */
class GuestList extends React.Component {

    static defaultProps = {
        guests: []
    }

    static propTypes = {
        handleChange: React.PropTypes.func,
        guests: React.PropTypes.array
    }

    state = {
        errorVisible: false,
        focus: false
    }

    constructor(props) {
        super(props)
        this.displayName = 'GuestList'
    }

    /**
     * check if value is valid, sets state accordingly
     * @return {void}
     */

	checkValue() {
        const { guests } = this.props
        console.log(guests)
        console.log(_.compact(guests).length)
        const errorVisible = !_.compact(guests).length
        console.log(errorVisible)
        this.setState({errorVisible, focus: false})
    }

    /**
     * update the value and removes errors
     * @param {syntheticEvent} e - the synthetic event 
     * @return {void}
     */

	updateValue(e, i) {
        const { handleChange, guests } = this.props
		const val = e.target.value
        const newGuests = _.clone(guests)
        if (i === guests.length) {
            newGuests.push(val)
        } else {
            newGuests[i] = val
        }
        this.setState({errorVisible: false})

        handleChange({target: {
            name: 'guests', 
            value: newGuests
        }})
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
    	const { guests } = this.props
        const { errorVisible, focus } = this.state
        const labelClass = classnames({
            'input-label': true,
            'input-label-focus': focus !== false
        })
        const textClass = classnames({
            'text-field': true,
            'text-field-focus': focus !== false
        })
        const inputClass = i => classnames({
            'input-container': true,
            'input-container-focus': focus === i
        })
        return <div className={textClass}>
            <label className={labelClass} htmlFor="guest-list">Guest List</label>
            <div className="ui-hint ui-hint-override">{errorVisible ? 'Please add at least one guest.' : ''}</div>
            {_.times(guests.length + 1, i => {
                return <div className={inputClass(i)} key={i}>
                    {guests[i] ? <Person/> : <PersonOutline/>}
                    <input
                        id={"guest-list"}
                        required={i === 0}
                        placeholder="e.g. Jane Doe"
                        type="text" 
                        onFocus={()=>this.setState({focus: i})}
                        value={guests.length ? guests[i] : ''}
                        onBlur={::this.checkValue}
                        onChange={e => this.updateValue(e, i)}
                    />
                </div>
            })}
        </div>
    }
}

export default GuestList