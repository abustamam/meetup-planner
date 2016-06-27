import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'
import Icon from './icons/icon'

/** A single text field
  * @extends React.Component
  */
class TextArea extends React.Component {

    static defaultProps = {
        type: 'text',
        value: ''
    }

    static propTypes = {
        label: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        handleChange: React.PropTypes.func,
        value: React.PropTypes.string
    }

    state = {
        focus: false,
        rows: 1
    }

    constructor(props) {
        super(props)
        this.displayName = 'TextArea'
    }

    componentDidMount() {
    	const scrollHeight = this.textarea.scrollHeight
    	this.setState({scrollHeight})
    }

    /**
     * update the value
     * @param {syntheticEvent} e - the synthetic event 
     * @return {void}
     */

	updateValue(e) {
        const { handleChange, label } = this.props
		const val = e.target.value
        const scrollHeight = this.textarea.scrollHeight
        const rows = _.round(Math.abs(scrollHeight - this.state.scrollHeight) / 26 + 1)
        this.setState({rows})
        handleChange({target: {
            name: 'message',
            value: val
        }})
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
    	const { label, placeholder, value, children } = this.props
        const { rows } = this.state
        const inputGroupClass = classnames({
            'text-field': true,
            'text-field-focus': this.state.focus
        })
        const inputLabelClass = classnames({
            'input-label': true,
            'input-label-focus': this.state.focus
        })
        const inputContainerClass = classnames({
            'input-container': true,
            'input-container-focus': this.state.focus
        })
        return <div className={inputGroupClass}>
            <label className={inputLabelClass} htmlFor={label}>{_.startCase(label)}<span> (optional)</span></label>
            <div className={inputContainerClass}>
                <Icon type="email"/>
                <textarea
                	ref={c => this.textarea = c}
                	rows={rows}
                    className="text-box"
                    id={label}
                    onFocus={()=>this.setState({focus: true})}
                	placeholder={placeholder}
                	type="text" 
                    value={value}
                    onBlur={()=>this.setState({focus: false})}
                	onChange={::this.updateValue}
                />
            </div>
        </div>
    }
}

export default TextArea