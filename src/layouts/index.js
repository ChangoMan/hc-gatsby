import React from 'react'
import Link from 'gatsby-link'

import '../assets/scss/main.scss'

class Template extends React.Component {
    render() {
        const { location, children } = this.props
        return (
            <div className="body body-home">
                {children()}
                {/*<div className="bg-filter"></div>*/}
            </div>
        )
    }
}

Template.propTypes = {
    children: React.PropTypes.func,
    location: React.PropTypes.object,
    route: React.PropTypes.object,
}

export default Template