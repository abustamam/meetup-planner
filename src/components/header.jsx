import React from 'react';

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