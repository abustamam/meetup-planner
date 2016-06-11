import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import _ from 'lodash'

class TextField extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'TextField'
        this.state = {}
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
        if (type === 'email') {
            const eml = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)
            const valid = eml.test(val)
            if (!valid) {
                this.setState({
                    error: `Email address is invalid`
                })
                return
            }
        } else if (type === 'password') {
        	const pass = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            const valid = pass.test(val)
            if (!valid) {
                this.setState({
                    error: `Password must have minimum of 8 characters and at least 1 letter and 1 number`
                })
                return
            }
        }

        const error = val ? '' : required ? `${_.capitalize(label)} is required` : ''

        this.setState({error})
    }

	updateValue(e) {
        const { handleChange, label } = this.props
		const val = e.target.value
        this.setState({val, error: ''})
        handleChange(label, val)
    }

    render() {
    	const { autofocus, required, label, placeholder, type, errorText, onBlur, onChange } = this.props
        return <div className="text-field">
            <label htmlFor={label}>{_.startCase(label)}{required ? <sup>*</sup> : null}</label>
            { (this.state.error || (this.props.tryUpdate && !this.state.val)) ? <span> {this.state.error}</span> : null}
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