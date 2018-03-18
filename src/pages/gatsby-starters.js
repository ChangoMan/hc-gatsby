import React from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import SubscribeForm from '../components/SubscribeForm'

const formProps = {
    action: 'https://hunterchang.us17.list-manage.com/subscribe/post?u=d8b54a1bbe98f0c81add64e56&amp;id=bbf0c0ef12',
    messages: {
        inputPlaceholder: "Email Address",
        btnLabel: "Subscribe",
        sending: "Working...",
        success: "Please check your email to complete the subscription process. Thank you!",
        error: "Please enter a valid email address."
    },
    styles: {
        sending: {
            fontSize: 14,
            color: "auto"
        },
        success: {
            fontSize: 14,
            color: "green"
        },
        error: {
            fontSize: 14,
            color: "red"
        }
    }
}

class GatsbyStarters extends React.Component {
    render() {

        return (
            <div>
                <Helmet>
                    <title>Gatsby.js Starters and Templates | Hunter Chang</title>
                    <meta name="description" content="A collection of React.js website starters and templates for Gatsby.js" />
                </Helmet>

                <div className="banner banner--page banner--gatsby-starters">
                    <div className="banner__content text-center">
                        <h1 className="text-uppercase"><strong>Gatsby.js <br /> Starters and Templates</strong></h1>
                    </div>
                </div>

                <div className="container-fluid" style={{padding: '20px'}}>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="p-5 text-center">
                                <h2 className="mb-4">Gatsby Dimension</h2>
                                <p className="lead-lg mb-4">A fully responsive, single page React.js website template. Built using Gatsby.js and designed by <a href="https://html5up.net/dimension">HTML5 UP</a>. Great for a quick profile or portfolio site.</p>
                                <p>
                                    <a href="http://gatsby-dimension.surge.sh/" title="Preview Template" className="social-icon-link u-link-white" target="blank"><span className="fi-monitor"></span></a>
                                    <a href="https://github.com/ChangoMan/gatsby-starter-dimension" title="View code on Github" className="social-icon-link u-link-white" target="blank"><span className="fi-social-github"></span></a>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Img sizes={this.props.data.gatsbyDimension.sizes} />
                        </div>
                    </div>
                </div>

                <div className="container-fluid" style={{padding: '20px'}}>
                    <div className="row align-items-center">
                        <div className="col-md-6 order-md-2">
                            <div className="p-5 text-center">
                                <h2 className="mb-4">Gatsby Forty</h2>
                                <p className="lead-lg mb-4">A colorful website template featuring a landing page, two hero banner styles, and a generic page. Built using Gatsby.js and designed by <a href="https://html5up.net/forty">HTML5 UP</a>.</p>
                                <p>
                                    <a href="http://gatsby-forty.surge.sh/" title="Preview Template" className="social-icon-link u-link-white" target="blank"><span className="fi-monitor"></span></a>
                                    <a href="https://github.com/ChangoMan/gatsby-starter-forty" title="View code on Github" className="social-icon-link u-link-white" target="blank"><span className="fi-social-github"></span></a>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-1">
                            <Img sizes={this.props.data.gatsbyForty.sizes} />
                        </div>
                    </div>
                </div>

                <div className="container-fluid" style={{padding: '20px'}}>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="p-5 text-center">
                                <h2 className="mb-4">Gatsby Strata</h2>
                                <p className="lead-lg mb-4">This super simple site features a lightbox style photo gallery. Fully responsive and perfect for displaying your work. Designed by <a href="https://html5up.net/strata">HTML5 UP</a>.</p>
                                <p>
                                    <a href="http://gatsby-strata.surge.sh/" title="Preview Template" className="social-icon-link u-link-white" target="blank"><span className="fi-monitor"></span></a>
                                    <a href="https://github.com/ChangoMan/gatsby-starter-strata" title="View code on Github" className="social-icon-link u-link-white" target="blank"><span className="fi-social-github"></span></a>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Img sizes={this.props.data.gatsbyStrata.sizes} />
                        </div>
                    </div>
                </div>

                <div className="container-fluid" style={{padding: '20px'}}>
                    <div className="row align-items-center">
                        <div className="col-md-6 order-md-2">
                            <div className="p-5 text-center">
                                <h2 className="mb-4">Gatsby Stellar</h2>
                                <p className="lead-lg mb-4">A scroll friendly, responsive site. Supports single or multiple pages. Has smooth scrolling to the different sections of the page. Designed by <a href="https://html5up.net/stellar">HTML5 UP</a>.</p>
                                <p>
                                    <a href="http://gatsby-stellar.surge.sh/" title="Preview Template" className="social-icon-link u-link-white" target="blank"><span className="fi-monitor"></span></a>
                                    <a href="https://github.com/codebushi/gatsby-starter-stellar" title="View code on Github" className="social-icon-link u-link-white" target="blank"><span className="fi-social-github"></span></a>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-1">
                            <Img sizes={this.props.data.gatsbyStellar.sizes} />
                        </div>
                    </div>
                </div>

                <div className="container-fluid newsletter text-center" style={{padding: '20px'}}>
                    <div className="container">
                        <p>Sign up and receive an email alert when the next Gatsby Starter is released!</p>
                        <SubscribeForm {...formProps}/>
                    </div>
                </div>


            </div>
        )
    }
}

export default GatsbyStarters

export const pageQuery = graphql`
    query GatsbyStartersQuery {
        gatsbyDimension: imageSharp(id: { regex: "/template-gatsby-dimension/" }) {
            sizes(maxWidth: 1200) {
              ...GatsbyImageSharpSizes
            }
        }
        gatsbyForty: imageSharp(id: { regex: "/template-gatsby-forty/" }) {
            sizes(maxWidth: 1200) {
              ...GatsbyImageSharpSizes
            }
        }
        gatsbyStrata: imageSharp(id: { regex: "/template-gatsby-strata/" }) {
            sizes(maxWidth: 1200) {
              ...GatsbyImageSharpSizes
            }
        }
        gatsbyStellar: imageSharp(id: { regex: "/template-gatsby-stellar/" }) {
            sizes(maxWidth: 1200) {
              ...GatsbyImageSharpSizes
            }
        }
    }
`