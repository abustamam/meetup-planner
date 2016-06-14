import React from 'react'
import NewUser from './newuser'
import classnames from 'classnames'
import _ from 'lodash'
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
		selectedTab: 'new user'
	}

    constructor(props) {
        super(props);
        this.displayName = 'Main'
    }

    render() {
    	const { allUsers } = this.props
    	const tabs = ['new user', 'new event', 'view all events']
    	const renderTab = () => {
	    	const { selectedTab } = this.state
	    	if (selectedTab === 'new user') {
	    		return <NewUser allUsers={allUsers}/>
	    	} else if (selectedTab === 'new event') {
	    		return
	    	} else if (selectedTab === 'view all events') {
	    		return
	    	} else {
	    		console.error('error')
	    	}
	    }

        return <div>
        	<div className="tabs">
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
        	</div>
        	{renderTab()}
    	</div>
    }
}

export default Main
