import React from 'react'
import TextField from './textfield.jsx'
import { create } from './../actions/useractions'
import update from 'react-addons-update'
import _ from 'lodash'

/** New user creation screen
  * @extends React.Component
  */
class NewUser extends React.Component {
    state = {
        newUser: {},
        errorVisible: false
    }


    constructor(props) {
        super(props);
        this.displayName = 'NewUser'
    }

    /**
     * handles changing of the user that is currently being created
     * @param {String} name - attribute name, e.g. "email"
     * @param {String} value - value of prop, e.g. "rasheed.bustamam@gmail.com"
     * @return {void}
     */

    handleChange(name, value) {
        const newObj = update(this.state.newUser, {
            $merge: {[name]: value}
        })

        this.setState({
            newUser: newObj,
            errorVisible: false
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
        this.handleCreate()
        // const { name, email, password } = this.state.newUser
        // if (name && email && password) {
        //     this.handleCreate()
        // } else {
        //     this.setState({errorVisible: true})
        // }
    }

    /**
     * handles creation of new user
     * @return {void}
     */

    handleCreate() {
        const user = {
            ...this.state.newUser
        }
        create(user)
        this.setState({newUser: {}, errorVisible: false})
        this.props.setActiveTab('new event')
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
        const { errorVisible, newUser } = this.state
        return <div className="main">
            <form className="form" onSubmit={::this.tryCreate}>
                <span>All fields required unless marked optional</span>
                <TextField 
                    autofocus={true}
                    required={true}
                    label="name"
                    placeholder="e.g. John Doe"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newUser['name']}
                />
                <TextField 
                    required={true}
                    label="email"
                    placeholder="e.g. name@example.com"
                    errorText="Email address is invalid"
                    type="email"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newUser['email']}
                />
                <TextField 
                    required={true}
                    label="password" 
                    placeholder="Minimum 8 characters"
                    errorText="Password must have minimum of 8 characters"
                    type="password"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newUser['password']}
                />
                <TextField 
                    label="employer"
                    placeholder="e.g. Google"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newUser['employer']}
                />
                <TextField 
                    label="job title"
                    placeholder="e.g. Software Engineer"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newUser['job title']}
                />
                <TextField 
                    label="birthday"
                    placeholder="mm/dd/yyyy"
                    type="date"
                    handleChange={::this.handleChange}
                    errorVisible={errorVisible}
                    value={newUser['birthday']}
                />
                <button type="submit" className="submit">Create New User</button>
            </form>
        </div>
    }
}

export default NewUser