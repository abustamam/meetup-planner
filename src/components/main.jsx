import React from 'react'
import NewUser from './newuser'
// import Circle from './circle' // not using for now

/** Main portion of the app
  * @extends React.Component
  */

class Main extends React.Component {

    static defaultProps = {
	    allUsers: {}
    }

    static propTypes = {
        allUsers: React.PropTypes.object
    }


	state = {
		selectedTab: 'newUser'
	}

    constructor(props) {
        super(props);
        this.displayName = 'Main'
    }

    render() {
    	const { allUsers } = this.props
        return <div>
        	<div className="tabs">
        		<div className="tab">New User</div>
        		<div className="tab">New Event</div>
        		<div className="tab">View all events</div>
        	</div>
        	<NewUser allUsers={allUsers}/>
    	</div>
    }
}

export default Main
