import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import _ from 'lodash'

/** A single text field
  * @extends React.Component
  */
class TextField extends React.Component {

    static defaultProps = {
        autofocus: false,
        required: false,
        type: 'text',
        value: ''
    }

    static propTypes = {
        label: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        autofocus: React.PropTypes.bool,
        required: React.PropTypes.bool,
        type: React.PropTypes.string,
        errorVisible: React.PropTypes.bool,
        value: React.PropTypes.string
    }

    state = {
        errorVisible: this.props.errorVisible || false,
        errorText: this.props.errorText || (this.props.required ? `${_.capitalize(this.props.label)} is required.` : '')
    }

    constructor(props) {
        super(props)
        this.displayName = 'TextField'
    }

    componentWillReceiveProps(nextProps) {
        this.setState({errorVisible: nextProps.errorVisible})
    }

    /**
     * check if value is valid, sets state accordingly
     * @return {void}
     */

	checkValue() {
        const { type = "text", label, required, value } = this.props
        let errorVisible = true
        if (type === 'email') {
            // test if val is a valid email
            // from http://emailregex.com/
            const eml = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)
            errorVisible = !eml.test(value)
        } else if (type === 'password') {
            // test if val has at least 8 chars
        	const pass = new RegExp(/^.{8,}$/)
            errorVisible = !pass.test(value)
        } else {
            // return true only if field is required and val is empty
            errorVisible = required && !value
        }

        this.setState({errorVisible})
    }

    /**
     * update the value and removes errors
     * @param {syntheticEvent} e - the synthetic event 
     * @return {void}
     */

	updateValue(e) {
        const { handleChange, label } = this.props
		const val = e.target.value
        this.setState({errorVisible: false})
        handleChange(label, val)
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
    	const { required, label, placeholder, type, value, autofocus } = this.props
        const { errorVisible, errorText } = this.state
        return <div className="text-field">
            <label htmlFor={label}>{_.startCase(label)}{required ? <sup>*</sup> : null}</label>
            <div className="errorText">{errorVisible ? errorText : ''}</div>
        	<input
                id={label}
                autoFocus={autofocus}
                required={required}
                autoComplete={label}
        		placeholder={placeholder}
        		type={type} 
                value={value}
        		onBlur={::this.checkValue}
        		onChange={::this.updateValue}
    		/>
        </div>
    }
}

export default TextField