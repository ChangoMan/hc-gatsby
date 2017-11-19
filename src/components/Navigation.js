import React from 'react'
import Link from 'gatsby-link'

const Navigation = (props) => (
    <div className="nav-mobile">
        <nav className="nav-main">
            <ul className="nav-main__list">
                <li><Link to="/" onClick={props.handleToggleNav}>Home</Link></li>
                <li><Link to="/wordpress-to-gatsbyjs/" onClick={props.handleToggleNav}>From Wordpress to Gatsby.js</Link></li>
            </ul>
        </nav>
    </div>
)

export default Navigation