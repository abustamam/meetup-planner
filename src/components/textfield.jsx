import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import _ from 'lodash'

class TextField extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'TextField'
        const { error, label, required } = this.props
        this.state = {
            errorVisible: false,
            error: error || (required ? `${_.capitalize(label)} is required.` : ''),
            val: ''
        }
    }
    componentDidMount() {
    	const { autofocus } = this.props
    	if (autofocus) {
    		this.input.focus()
    	}
	}

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

	updateValue(e) {
        const { handleChange, label } = this.props
		const val = e.target.value
        this.setState({val, errorVisible: false})
        handleChange(label, val)
    }

    render() {
    	const { autofocus, required, label, placeholder, type, errorText, onBlur, onChange } = this.props
        const { errorVisible, error } = this.state
        return <div className="text-field">
            <label htmlFor={label}>{_.startCase(label)}{required ? <sup>*</sup> : null}</label>
            { (errorVisible) ? <span> {error}</span> : null}
        	<input
                id={label}
        		ref={c => this.input = c}
        		placeholder={placeholder}
        		type={type || 'text'} 
        		onBlur={() => this.checkValue()}
        		onChange={e => this.updateValue(e)}
    		/>
        </div>
    }
}

export default TextField