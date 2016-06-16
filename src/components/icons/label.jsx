import React from 'react'

class Label extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Label'
    }
    render() {
        return <svg viewBox="0 0 24 24" className="svg-icon">
        	<polyline points="0,16 12,4 20,4 20,12 8,24"/>
        	<circle fill="white" cx="16" cy="8" r="2" />
        </svg>
    }
}

export default Label



