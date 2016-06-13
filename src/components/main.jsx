import React from 'react'
import TextField from './textfield.jsx'
import { create } from './../actions/useractions.js'
import update from 'react-addons-update'
import _ from 'lodash'

class Main extends React.Component {

    static defaultProps = {
        allUsers: {}
    }

    static propTypes = {
        allUsers: React.PropTypes.object
    }

    state = {
        newUser: {},
        tryUpdate: false
    }


    constructor(props) {
        super(props);
        this.displayName = 'Main'
    }

    /**
     * handles changing of the user that is currently being created
     * @param name: String, attribute name, e.g. "email"
     * @param value: String, value of prop, e.g. "rasheed.bustamam@gmail.com"
     * @return void
     */

    handleChange(name, value) {
        const newObj = update(this.state.newUser, {
            $merge: {[name]: value}
        })

        this.setState({
            newUser: newObj,
            tryUpdate: false
        })
    }

    /**
     * attempts to create a new user, throws an error if any required 
     * attributes are not filled in correctly
     * @param e syntheticEvent
     * @return void
     */

    tryCreate(e) {
        e.preventDefault()
        this.setState({tryUpdate: true})
        const { name, email, password } = this.state.newUser
        if (name && email && password) {
            this.handleCreate()
        }
    }

    /**
     * handles creation of new user
     * @return void
     */

    handleCreate() {
        const user = {
            ...this.state.newUser
        }
        create(user)
        this.setState({newUser: {}})
    }

    /**
     * render the component
     * @return void
     */

    render() {
        return <div className="main">
            <form className="form" onSubmit={(e) => this.tryCreate(e)}>
                <TextField 
                    autofocus={true}
                    required={true}
                    label="name"
                    placeholder="John Doe"
                    handleChange={::this.handleChange}
                    tryUpdate={this.state.tryUpdate}
                />
                <TextField 
                    required={true}
                    label="email"
                    placeholder="name@example.com"
                    errorText="Email address is invalid"
                    type="email"
                    handleChange={::this.handleChange}
                    tryUpdate={this.state.tryUpdate}
                />
                <TextField 
                    required={true}
                    label="password" 
                    placeholder="Minimum 8 characters"
                    errorText="Password must have minimum of 8 characters"
                    type="password"
                    handleChange={::this.handleChange}
                    tryUpdate={this.state.tryUpdate}
                />
                <TextField 
                    label="employer"
                    placeholder="Google"
                    handleChange={::this.handleChange}
                    tryUpdate={this.state.tryUpdate}
                />
                <TextField 
                    label="job title"
                    placeholder="Software Engineer"
                    handleChange={::this.handleChange}
                    tryUpdate={this.state.tryUpdate}
                />
                <TextField 
                    label="birthday"
                    placeholder="mm/dd/yyyy"
                    type="date"
                    handleChange={::this.handleChange}
                    tryUpdate={this.state.tryUpdate}
                />
                <span><sup>*</sup>Required</span>
                <button type="submit">Submit</button>
            </form>
        </div>
    }
}

export default Main