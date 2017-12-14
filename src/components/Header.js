import React from 'react'

const Header = (props) => (
    <header className="site-header" itemScope itemType="http://schema.org/WPHeader">
        <button className={"hamburger hamburger--spin u-no-outline js-toggle-nav" + props.toggleClass} type="button" onClick={props.handleToggleNav}>
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    </header>
)

Header.propTypes = {
    handleToggleNav: React.PropTypes.func,
    toggleClass: React.PropTypes.string,
}

export default Header