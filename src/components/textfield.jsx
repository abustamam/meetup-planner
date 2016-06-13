import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import _ from 'lodash'

class TextField extends React.Component {

    static defaultProps = {
        autofocus: false,
        required: false,
        type: 'text'
    }

    static propTypes = {
        label: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        autofocus: React.PropTypes.bool,
        required: React.PropTypes.bool,
        type: React.PropTypes.string
    }

    state = {
        errorVisible: false,
        val: '',
        errorText: this.props.errorText || (this.props.required ? `${_.capitalize(this.props.label)} is required.` : '')
    }

    constructor(props) {
        super(props)
        this.displayName = 'TextField'
    }

    /*
     * focus on input box if thie component is set to autofocus
     * @return void
     */

    componentDidMount() {
    	const { autofocus } = this.props
    	if (autofocus) {
    		this.input.focus()
    	}
	}

    /**
     * check if value is valid, sets state accordingly
     * @return void
     */

	checkValue() {
        const { type = "text", label, required } = this.props
        const { val } = this.state
        let errorVisible = true
        if (type === 'email') {
            // test if val is a valid email
            // from http://emailregex.com/
            const eml = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)
            errorVisible = !eml.test(val)
        } else if (type === 'password') {
            // test if val has at least 8 chars
        	const pass = new RegExp(/^.{8,}$/)
            errorVisible = !pass.test(val)
        } else {
            // return true only if field is required and val is empty
            errorVisible = required && !val
        }

        this.setState({errorVisible})
    }

    /**
     * update the value and removes errors
     * @return void
     */

	updateValue(e) {
        const { handleChange, label } = this.props
		const val = e.target.value
        this.setState({val, errorVisible: false})
        handleChange(label, val)
    }

    /**
     * render the component
     * @return void
     */

    render() {
    	const { autofocus, required, label, placeholder, type, onBlur, onChange } = this.props
        const { errorVisible, val, errorText } = this.state
        return <div className="text-field">
            <label htmlFor={label}>{_.startCase(label)}{required ? <sup>*</sup> : null}</label>
            { (errorVisible) ? <span> {errorText}</span> : null}
        	<input
                id={label}
        		ref={c => this.input = c}
        		placeholder={placeholder}
        		type={type} 
        		onBlur={() => this.checkValue()}
        		onChange={e => this.updateValue(e)}
    		/>
        </div>
    }
}

export default TextField