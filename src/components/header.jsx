import React from 'react';

/** The header
  * @extends React.Component
  */

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header'
    }
    
    render() {
        return <header className="header">
            <div className="title">
                Meetup Planner
            </div>
        </header>
    }
}

export default Header