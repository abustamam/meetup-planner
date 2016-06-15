import React from 'react'
import _ from 'lodash'

class ViewEvents extends React.Component {
	static defaultProps = {
		allEvents: {},
		allUsers: {}
	}

	static propTypes = {
	    allEvents: React.PropTypes.object,
	    allUsers: React.PropTypes.object
	}

    constructor(props) {
        super(props)
        this.displayName = 'ViewEvents'
    }
    render() {
    	const { allEvents, allUsers } = this.props
    	return <div className="main">
    		{ _.keys(allEvents).length ? <div>
    			{_.map(allEvents, event => {
    				return <div key={event.id}>{event['event name']}</div>
    			})}
    		</div> : <div>No events found</div>}
    	</div>
    }
}

export default ViewEvents