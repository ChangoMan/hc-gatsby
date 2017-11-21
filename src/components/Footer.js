import React from 'react'
import Link from 'gatsby-link'

const Footer = (props) => (
    <footer className="site-footer pt-4 pb-4" style={{borderTop: '1px solid #222'}}>
        <div className="container">
            <Link to="/" className="link-white">&copy; 2017 Hunter Chang</Link>
        </div>
    </footer>
)

export default Footer