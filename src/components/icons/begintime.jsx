import React from 'react'

class BeginTime extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'BeginTime'
    }
    render() {
        return <svg viewBox="0 0 24 24" className="svg-icon">
            <g>
            	<polyline points="0,2 3,2 3,22 0,22"/>
            	<polyline points="3,9 16,9 16,5 23,12 16,19 16,15 3,15"/>
            </g>
        </svg>
    }
}

export default BeginTime



