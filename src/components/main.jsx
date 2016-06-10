import React from 'react'
import TextField from './textfield.jsx'
import _ from 'lodash'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Main'
        this.state = {}
    }

    render() {
        return <div className="main">
        	<TextField 
                autofocus={true}
                required={true}
                label="Name"
                placeholder="John Doe"
            />
            <TextField 
                required={true}
                label="Email Address"
                placeholder="name@example.com"
                type="email"
            />
            <TextField 
                required={true}
                label="Password" 
                placeholder="Minimum 8 characters, at least 1 letter and 1 number, no special characters"
                type="password"
            />
            <TextField 
                label="Employer"
                placeholder="Google"
            />
            <TextField 
                label="Job Title"
                placeholder="Software Engineer"
            />
            <TextField 
                label="Birthday"
                placeholder="mm/dd/yyyy"
                type="date"
            />
        </div>
    }
}

export default Main