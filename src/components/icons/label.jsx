import React from 'react'

class Label extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Label'
    }
    render() {
        return <svg viewBox="0 0 24 24" className="svg-icon">
        	<polyline points="0,16 12,4 20,4 20,12 8,24" stroke="black"/>
        	<circle fill="white" cx="16" cy="8" r="2" />
        	{/*<path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>*/}
        </svg>
    }
}

export default Label



