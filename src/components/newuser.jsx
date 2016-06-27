import React from 'react'
import update from 'react-addons-update'
import _ from 'lodash'
import Validation from 'react-validation'
import validator from 'validator'
import classnames from 'classnames'
import TextField from './textfield.jsx'
import { create } from './../actions/useractions'
import Person from './icons/person'
import Email from './icons/email'
import Lock from './icons/lock'
import Office from './icons/office'
import Work from './icons/work'
import Cake from './icons/cake'
import InputGroup from './inputgroup'


Validation.extendErrors({
    isRequired: {
        className: 'ui-input_state_empty',
        message: 'Required',
        rule: function(value) {
            return Boolean(validator.trim(value));
        }
    },
    isEmail: {
        className: 'ui-input_state_email-pattern-failed',
        message: 'Invalid Email'
    },
    longPassword: {
        message: 'Password must have more than 8 characters',
        rule: function(value) {
            return value.length >= 8
        }
    }
})

/** New user creation screen
  * @extends React.Component
  */
class NewUser extends React.Component {
    state = {
        newUser: {},
        errorVisible: false,
        focus: null
    }


    constructor(props) {
        super(props);
        this.displayName = 'NewUser'
    }

    // componentDidMount() {
    //     this.form.addEventListener('invalid', ::this.tryCreate, true)
    // }

    // componentWillUnmount() {
    //     this.form.removeEventListener('invalid', this.tryCreate)
    // }

    /**
     * handles changing of the user that is currently being created
     * @param {String} name - attribute name, e.g. "email"
     * @param {String} value - value of prop, e.g. "rasheed.bustamam@gmail.com"
     * @return {void}
     */

    handleChange(e) {
        const label = e.target.name
        const value = e.target.value
        const newObj = update(this.state.newUser, {
            $merge: {[label]: value}
        })

        console.log(newObj)

        this.setState({
            newUser: newObj
        })
    }

    /**
     * attempts to create a new user, throws an error if any required 
     * attributes are not filled in correctly
     * @param {syntheticEvent} e - the event
     * @return {void}
     */

    tryCreate(e) {
        e.preventDefault()
        console.log(this.state.newUser)

        const { name, email, password } = this.state.newUser
        if (name && email && password) {
            this.handleCreate()
        } else {
            this.form.forceValidate(true)
        }
    }

    handleBlur(label) {
        this.setState({focus: null})
        // this.form.forceValidate(true)
        const component = this[label]
        if (!component) return
        console.log(component.state.value)
        if (!component.state.value) {
            component.showError('Required')
        }
    }

    /**
     * handles creation of new user
     * @return {void}
     */

    handleCreate() {
        create(this.state.newUser)
        this.setState({newUser: {}})
        this.props.setActiveTab('new event')
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
        const { errorVisible, newUser } = this.state

        const inputLabelClass = label => {
            return classnames({
                'input-label': true,
                'input-label-focus': this.state.focus === label
            })
        }

        const inputGroupClass = label => {
            return classnames({
                'input-group': true,
                'input-group-focus': this.state.focus === label
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
                        Name
                    </label>
                    <Validation.Input
                        ref={c => this.name = c}
                        name='name'
                        wrapper={{component: InputGroup}}
                        type='text'
                        autoFocus={true}
                        placeholder="e.g. John Doe"
                        blocking='input'
                        icon='person'
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
                <div className={inputGroupClass('email')}>
                    <label className={inputLabelClass('email')}>
                        Email
                    </label>
                    <Validation.Input
                        ref={c => this.email = c}
                        name='email'
                        wrapper={{component: InputGroup}}
                        type='email'
                        placeholder="e.g. name@example.com"
                        blocking='input'
                        icon='email'
                        containerClassName={inputClass('email')}
                        onFocus={()=>this.setState({focus: 'email'})}
                        onBlur={()=>this.handleBlur('email')}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'email'}
                        validations={[{
                            rule: 'isRequired'
                        },{
                            rule: 'isEmail'
                        }]}
                    />
                </div>
                <div className={inputGroupClass('password')}>
                    <label className={inputLabelClass('password')}>
                        Password
                    </label>
                    <Validation.Input
                        ref={c => this.password = c}
                        name='password'
                        wrapper={{component: InputGroup}}
                        type='password'
                        placeholder="Minimum 8 characters"
                        blocking='input'
                        icon='lock'
                        containerClassName={inputClass('password')}
                        onFocus={()=>this.setState({focus: 'password'})}
                        onBlur={()=>this.handleBlur('password')}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'password'}
                        validations={[{
                            rule: 'isRequired'
                        },{
                            rule: 'longPassword'
                        }]}
                    />
                </div>
                <div className={inputGroupClass('employer')}>
                    <label className={inputLabelClass('employer')}>
                        Employer (optional)
                    </label>
                    <Validation.Input
                        ref={c => this.employer = c}
                        name='employer'
                        wrapper={{component: InputGroup}}
                        type='text'
                        placeholder="e.g. Google"
                        blocking='input'
                        icon='office'
                        containerClassName={inputClass('employer')}
                        onFocus={()=>this.setState({focus: 'employer'})}
                        onBlur={::this.handleBlur}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'employer'}
                    />
                </div>
                <div className={inputGroupClass('job')}>
                    <label className={inputLabelClass('job')}>
                        Job Title (optional)
                    </label>
                    <Validation.Input
                        ref={c => this.job = c}
                        name='job'
                        wrapper={{component: InputGroup}}
                        type='text'
                        placeholder="e.g. Software Engineer"
                        blocking='input'
                        icon='work'
                        containerClassName={inputClass('job')}
                        onFocus={()=>this.setState({focus: 'job'})}
                        onBlur={::this.handleBlur}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'job'}
                    />
                </div>
                <div className={inputGroupClass('birthday')}>
                    <label className={inputLabelClass('birthday')}>
                        Birthday (optional)
                    </label>
                    <Validation.Input
                        ref={c => this.birthday = c}
                        name='birthday'
                        wrapper={{component: InputGroup}}
                        type='date'
                        placeholder="mm/dd/yyyy"
                        blocking='input'
                        icon='cake'
                        containerClassName={inputClass('birthday')}
                        onFocus={()=>this.setState({focus: 'birthday'})}
                        onBlur={::this.handleBlur}
                        onChange={::this.handleChange}
                        focus={this.state.focus === 'birthday'}
                    />
                </div>
                <Validation.Button blocking="button" className="submit" disabledClassName="submit-disabled" disabled={false} value="Create New User" />
            </Validation.Form>
        </div>
    }
}

export default NewUser