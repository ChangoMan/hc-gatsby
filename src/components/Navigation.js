import React from 'react'
import Link from 'gatsby-link'

const Navigation = (props) => (
    <div className="nav-mobile">
        <nav className="nav-main">
            <ul className="nav-main__list">
                <li><Link to="/" onClick={props.handleToggleNav}>Home</Link></li>
                <li><Link to="/gatsby-starters/" onClick={props.handleToggleNav}>Gatsby.js Starters And Templates</Link></li>
                <li><Link to="/gatsby-featured-images/" onClick={props.handleToggleNav}>Featured Blog Images In Gatsby.js</Link></li>
                <li><Link to="/using-gatsby-image/" onClick={props.handleToggleNav}>Using Gatsby Image</Link></li>
                <li><Link to="/wordpress-to-gatsbyjs/" onClick={props.handleToggleNav}>From Wordpress to Gatsby.js</Link></li>
            </ul>
        </nav>
    </div>
)

Navigation.propTypes = {
    handleToggleNav: React.PropTypes.func
}

export default Navigation