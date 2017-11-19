import React from 'react'

const Header = (props) => (
    <header className="site-header">
        <button className={"hamburger hamburger--spin u-no-outline js-toggle-nav" + props.toggleClass} type="button" onClick={props.handleToggleNav}>
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    </header>
)

export default Header