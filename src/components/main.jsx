import React from 'react'
import TextField from './textfield.jsx'
import { create } from './../actions/useractions.js'
import update from 'react-addons-update'
import _ from 'lodash'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Main'
        this.state = {
            newUser: {},
            tryUpdate: false
        }
    }

    handleChange(name, value) {
        const lowerName = _.toLower(name)

        const newObj = update(this.state.newUser, {
            $merge: {[lowerName]: value}
        })

        this.setState({
            newUser: newObj,
            tryUpdate: false
        })
    }

    tryCreate(e) {
        e.preventDefault()
        this.setState({tryUpdate: true})
        const { name, email, password } = this.state.newUser
        if (name && email && password) {
            this.handleCreate()
        }
    }

    handleCreate() {
        const user = {
            ...this.state.newUser
        }
        create(user)
        this.setState({newUser: {}})
    }

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
                    error="Email address is invalid"
                    type="email"
                    handleChange={::this.handleChange}
                    tryUpdate={this.state.tryUpdate}
                />
                <TextField 
                    required={true}
                    label="password" 
                    placeholder="Minimum 8 characters"
                    error="Password must have minimum of 8 characters"
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