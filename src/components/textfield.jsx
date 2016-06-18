import React from 'react'
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
        errorText: this.props.errorText || (this.props.required ? `${_.capitalize(this.props.label)} is required.` : ''),
        focus: false
    }

    constructor(props) {
        super(props)
        this.displayName = 'TextField'
    }

    componentWillReceiveProps(nextProps) {
        const { errorVisible } = nextProps
        if (errorVisible) {
            this.checkValue()
        } else {
            this.setState({errorVisible})
        }
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

        this.setState({errorVisible, focus: false})
    }

    /**
     * update the value and removes errors
     * @param {syntheticEvent} e - the synthetic event 
     * @return {void}
     */

	updateValue(e) {
        const { handleChange, label } = this.props
		const val = e.target.value
        // this.setState({errorVisible: false})
        handleChange(label, val)
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
    	const { required, label, placeholder, type, value, autofocus, children } = this.props
        const { errorVisible, errorText } = this.state
        const labelClass = classnames({
            'input-label': true,
            'input-label-focus': this.state.focus
        })
        const textClass = classnames({
            'text-field': true,
            'text-field-focus': this.state.focus
        })
        const inputClass = classnames({
            'input-container': true,
            'input-container-focus': this.state.focus
        })
        return <div className={textClass}>
            <label className={labelClass} htmlFor={label}>{_.startCase(label)}{required ? null : <span> (optional)</span>}</label>
            <div className="errorText">{errorVisible ? errorText : ''}</div>
            <div className={inputClass}>
                {children}
                <input
                    className="input-box"
                    id={label}
                    autoFocus={autofocus}
                    onFocus={()=>this.setState({focus: true})}
                    required={required}
                    autoComplete={label}
                	placeholder={placeholder}
                	type={type} 
                    value={value}
                	onBlur={::this.checkValue}
                	onChange={::this.updateValue}
                />
            </div>
        </div>
    }
}

export default TextField