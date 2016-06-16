import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'

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
        errorVisible: React.PropTypes.bool,
        value: React.PropTypes.string
    }

    state = {
        errorVisible: this.props.errorVisible || false,
        errorText: this.props.errorText || (this.props.required ? `${_.capitalize(this.props.label)} is required.` : ''),
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

    componentWillReceiveProps(nextProps) {
    	const scrollHeight = this.textarea.scrollHeight
    	console.log(scrollHeight)
    	const rows = _.round(Math.abs(scrollHeight - this.state.scrollHeight) / 26 + 1)
        this.setState({errorVisible: nextProps.errorVisible, rows})
    }

    /**
     * update the value and removes errors
     * @param {syntheticEvent} e - the synthetic event 
     * @return {void}
     */

	updateValue(e) {
        const { handleChange, label } = this.props
		const val = e.target.value
        this.setState({errorVisible: false})
        handleChange(label, val)
    }

    /**
     * render the component
     * @return {void}
     */

    render() {
    	const { required, label, placeholder, type, value, autofocus, children } = this.props
        const { errorVisible, errorText, rows } = this.state
        const labelClass = classnames({
            'input-label': true,
            'input-label-focus': this.state.focus
        })
        const textClass = classnames({
            'text-field': true,
            'text-field-focus': this.state.focus
        })
        const inputClass = classnames({
            'input-container': true,
            'input-container-focus': this.state.focus
        })
        return <div className={textClass}>
            <label className={labelClass} htmlFor={label}>{_.startCase(label)}{required ? null : <span> (optional)</span>}</label>
            <div className="errorText">{errorVisible ? errorText : ''}</div>
            <div className={inputClass}>
                {children}
                <textarea
                	ref={c => this.textarea = c}
                	rows={rows}
                    className="text-box"
                    id={label}
                    autoFocus={autofocus}
                    onFocus={()=>this.setState({focus: true})}
                	placeholder={placeholder}
                	type={type} 
                    value={value}
                	onChange={::this.updateValue}
                />
            </div>
        </div>
    }
}

export default TextArea