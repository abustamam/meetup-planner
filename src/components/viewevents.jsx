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
    		{_.keys(allEvents).length ? <div className="events">
    			{_.map(allEvents, event => {
                    const start = moment(event.start).format('llll')
                    const end = moment(event.end).format('llll')
    				return <div key={event.id} className="event-item">
                        <div className="event-row">
                            <div className="event-cell"><strong>Event</strong> </div>
                            <div className="event-cell">{event.name}</div>
                        </div>
                        <div className="event-row">
                            <div className="event-cell"><strong>Host:</strong> </div>
                            <div className="event-cell">{_.startCase(event.host)}</div>
                        </div>
                        <div className="event-row">
                            <div className="event-cell"><strong>Type:</strong> </div>
                            <div className="event-cell">{_.startCase(event.type)}</div>
                        </div>
                        <div className="event-row">
                            <div className="event-cell"><strong>Time:</strong> </div>
                            <div className="event-cell">Starts: {start}</div>
                            <div className="event-cell">Ends: {end}</div>
                        </div>
                        <div className="event-row">
                            <div className="event-cell"><strong>Guests:</strong> </div>
                            <div className="event-cell">
                                {_.map(event.guests, guest => {
                                    return <div key={guest} className="event-guest">{_.startCase(guest)}</div>
                                })}
                            </div>
                        </div>
                        <div className="event-row">
                            <div className="event-cell"><strong>Message:</strong> </div>
                            <div className="event-cell">{event.message}</div>
                        </div>
                    </div>
    			})}
    		</div> : 
            <div className="events">No events found</div>}
    	</div>
    }
}

export default ViewEvents