import React from 'react'
import TextField from './textfield.jsx'
import { create } from './../actions/useractions.js'
import _ from 'lodash'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Main'
        this.state = {}
    }

    handleChange(name, value) {
        const lowerName = _.toLower(name)
        this.setState({
            [lowerName]: value
        })
    }

    handleCreate() {
        const { name, email, password } = this.state
        if (name && email && password) {
            const user = {
                ...this.state
            }
            create(user)
        }
    }

    render() {
        return <div className="main">
        	<TextField 
                autofocus={true}
                required={true}
                label="name"
                placeholder="John Doe"
                handleChange={::this.handleChange}
            />
            <TextField 
                required={true}
                label="email"
                placeholder="name@example.com"
                type="email"
                handleChange={::this.handleChange}
            />
            <TextField 
                required={true}
                label="password" 
                placeholder="Minimum 8 characters, at least 1 letter and 1 number, no special characters"
                type="password"
                handleChange={::this.handleChange}
            />
            <TextField 
                label="employer"
                placeholder="Google"
                handleChange={::this.handleChange}
            />
            <TextField 
                label="job title"
                placeholder="Software Engineer"
                handleChange={::this.handleChange}
            />
            <TextField 
                label="birthday"
                placeholder="mm/dd/yyyy"
                type="date"
                handleChange={::this.handleChange}
            />
            <button onClick={::this.handleCreate}>Submit</button>
        </div>
    }
}

export default Main