import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'
import NewUser from './newuser'
import NewEvent from './newevent'
import ViewEvents from './viewevents'
import Dehaze from './icons/dehaze'

// import Circle from './icons/circle' // not using for now

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
		selectedTab: 'new user'
	}

    constructor(props) {
        super(props);
        this.displayName = 'Main'
    }

    render() {
    	const { allUsers, allEvents } = this.props
    	const tabs = ['new user', 'new event', 'view all events']
    	const renderTab = () => {
	    	const { selectedTab } = this.state
	    	if (selectedTab === 'new user') {
	    		return <NewUser/>
	    	} else if (selectedTab === 'new event') {
	    		return <NewEvent/>
	    	} else if (selectedTab === 'view all events') {
	    		return <ViewEvents allEvents={allEvents} allUsers={allUsers} />
	    	} else {
	    		console.error('error')
	    	}
	    }

        return <div>
            <nav className="tabs">
        		{_.map(tabs, tab => {
        			const cname = classnames('tab', {selected: this.state.selectedTab === tab})
        			return <div 
        				key={tab}
        				className={cname} 
        				onClick={()=>this.setState({selectedTab: tab})}
    				>
        				{_.startCase(tab)}
        			</div>
        		})}
            </nav>
        	{renderTab()}
    	</div>
    }
}

export default Main
