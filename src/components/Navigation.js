import React from 'react'
import Link from 'gatsby-link'

const Navigation = (props) => (
    <div className="nav-mobile">
        <nav className="nav-main" itemScope itemType="http://schema.org/SiteNavigationElement">
            <ul className="nav-main__list">
                <li><Link itemProp="url" to="/" onClick={props.handleToggleNav}><span itemProp="name">Home</span></Link></li>
                <li><a itemProp="url" href="https://codebushi.com/gatsby-starters/"><span itemProp="name">Gatsby.js Starters And Templates</span></a></li>
            </ul>
        </nav>
    </div>
)

Navigation.propTypes = {
    handleToggleNav: React.PropTypes.func
}

export default Navigation