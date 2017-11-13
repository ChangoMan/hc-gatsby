import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import '../assets/scss/main.scss'

class Template extends React.Component {
    render() {

        const { location, children } = this.props

        let bodyClass = '';

        if (location.pathname === '/') {
            bodyClass = ' body-home';
        }

        return (
            <div className={'body' + bodyClass}>

                <Helmet>
                    <link href="https://file.myfontastic.com/BpzwX4LjHjPM2JxBPqgq4G/icons.css" rel="stylesheet" />
                </Helmet>

                {children()}
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