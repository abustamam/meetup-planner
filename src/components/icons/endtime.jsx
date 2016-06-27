import React from 'react'

class EndTime extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'EndTime'
    }
    render() {
        return <svg viewBox="0 0 24 24" className="svg-icon">
            <g>
                <polyline points="21,2 24,2 24,22 21,22"/>
                <polyline points="0,9 13,9 13,5 20,12 13,19 13,15 0,15"/>
            </g>
        </svg>
    }
}

export default EndTime



