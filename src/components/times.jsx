import React from 'react'
import TextField from './textfield'
import BeginTime from './icons/begintime'
import EndTime from './icons/endtime'

class Times extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Times'
    }

    handleBlur() {
    	const { startTime, endTime, handleChange } = this.props
    	
    }

    render() {
    	const { checkDate, handleChange, errorVisible, startTime, endTime } = this.props
    	console.log(checkDate(), errorVisible)
    	const errorVis = !checkDate() && errorVisible
        return <div>
        	<div className='errorText'>{errorVis ? 'Times are invalid' : ''}</div>
        	<TextField 
                required={true}
                label="start time" 
                placeholder="hh:mm"
                type="datetime-local"
                checkDate={checkDate}
                errorText={'Start time is invalid'}
                errorVisible={false}
                handleChange={handleChange}
                value={startTime}
            ><BeginTime/></TextField>
            <TextField 
                required={true}
                label="end time" 
                placeholder="hh:mm"
                type="datetime-local"
                checkDate={checkDate}
                errorText={'End time is invalid'}
                errorVisible={false}
                handleChange={handleChange}
                value={endTime}
            ><EndTime/></TextField>
        </div>
    }
}

export default Times
