import React from 'react'

class Circle extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Circle'
    }

    render() {
        return <svg viewBox="0 0 24 24" className="svg-icon">
    		<circle cx="12px" cy="12px" r="8px"/>
        </svg>
    }
}

export default Circle
