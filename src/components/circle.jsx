import React from 'react'

class Circle extends React.Component {
	static defaultProps = {
		width: 25,
		height: 25,
		fill: 'none'
	}

	static propTypes = {
	    width: React.PropTypes.number,
	    height: React.PropTypes.number,
	    fill: React.PropTypes.string
	}

    constructor(props) {
        super(props)
        this.displayName = 'Circle'
    }

    render() {
    	const { width, height, fill } = this.props
        return <svg width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`}>
        	<g>
        		<circle cx={`${width/2}`} cy={`${height/2}`} r={`${width/2}`} fill={fill} stroke="black" />
        	</g>
        </svg>
    }
}

export default Circle
