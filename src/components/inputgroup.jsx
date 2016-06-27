import React from 'react'
import Icon from './icons/icon'
import classnames from 'classnames'

class InputGroup extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'InputGroup'
    }
    render() {
        
    	const { children, icon, focus } = this.props
        const inputContainerClass = classnames({
            'input-container': true,
            'input-container-focus': focus
        })  
        return <div className={inputContainerClass}>
            <Icon icon={icon} />
        	<input {...this.props} />
        </div>
    }
}

export default InputGroup
