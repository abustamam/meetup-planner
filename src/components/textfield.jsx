import React from 'react'
import Validation from 'react-validation'
import validator from 'validator'
import classnames from 'classnames'
import _ from 'lodash'
import InputGroup from './inputgroup'

Validation.extendErrors({
    isRequired: {
        className: 'ui-input_state_empty',
        message: 'required',
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    },
    isEmail: {
        className: 'ui-input_state_email-pattern-failed',
        message: 'Invalid Email'
    }
})

/** A single text field
  * @extends React.Component
  */
class TextField extends React.Component {

    // wrapper={{component: InputGroup}}
    // type='text'
    // autoFocus={true}
    // blocking='input'
    // icon='person'
    // containerClassName={inputClass('name')}
    // onFocus={()=>this.setState({focus: 'name'})}
    // onBlur={()=>this.setState({focus: null})}
    // focus={this.state.focus === 'name'}
    // placeholder="e.g. John Doe"
    // validations={[{
    //     rule: 'isRequired'
    // }]}
    // name='name'

    static defaultProps = {
        autoFocus: false,
        type: 'text'
    }

    static propTypes = {
        wrapper: React.PropTypes.object,
        type: React.PropTypes.string,
        blocking: React.PropTypes.string,
        autoFocus: React.PropTypes.bool,
        icon: React.PropTypes.string,
        placeholder: React.PropTypes.string,
        validations: React.PropTypes.array,
        value: React.PropTypes.string
    }

    state = {
        focus: false
    }

    constructor(props) {
        super(props)
        this.displayName = 'TextField'
    }

    componentWillReceiveProps(nextProps) {
        // const { errorVisible } = nextProps
        // if (errorVisible) {
        //     this.checkValue()
        // } else {
        //     this.setState({errorVisible})
        // }
    }

    /**
     * check if value is valid, sets state accordingly
     * @return {void}
     */

	checkValue() {
        const { type = "text", label, required, value, checkDate } = this.props
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
        } /*else if (type === 'datetime-local') {
            // console.log(checkDate(), value)
            // errorVisible = !checkDate()
        }*/ else {
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
    	const { validations, icon, label, placeholder, type, value, autoFocus, children } = this.props
        const { errorVisible, errorText } = this.state
        const inputGroupClass = classnames({
            'input-group': true,
            'input-group-focus': this.state.focus
        })
        const inputLabelClass = classnames({
            'input-label': true,
            'input-label-focus': this.state.focus
        })
        const inputClass = classnames({
            'input': true,
            'input-focus': this.state.focus
        })
        return <div className={inputGroupClass}>
            <label className={inputLabelClass}>
                {_.startCase(label)}
            </label>
            <Validation.Input
                name={label}
                wrapper={{component: InputGroup}}
                type={type}
                autoFocus={autoFocus}
                blocking='input'
                icon={icon}
                containerClassName={inputClass}
                onFocus={()=>this.setState({focus: true})}
                onBlur={()=>this.setState({focus: false})}
                focus={this.state.focus}
                placeholder={placeholder}
                validations={validations}
            />
        </div>
    }
}

export default TextField