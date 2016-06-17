import React from 'react'
import moment from 'moment'
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
        console.log(allEvents)
    	return <div className="main">
    		{_.keys(allEvents).length ? <div>
    			{_.map(allEvents, event => {
                    const start = moment(event['start time']).format('llll')
                    const end = moment(event['end time']).format('llll')
    				return <div key={event.id} className="event">
                        <div>Event: {event['event name']}</div>
                        <div>Host: {event['event host']}</div>
                        <div>Type: {event['event type']}</div>
                        <div>Time: {start} - {end}</div>
                        <div>Guests: {_.map(event.guests, guest => {
                            return <div key={guest}>{guest}</div>
                        })}</div>
                        <div>Message: {event['message to guests']}</div>
                    </div>
    			})}
    		</div> : 
            <div>No events found</div>}
    	</div>
    }
}

export default ViewEvents