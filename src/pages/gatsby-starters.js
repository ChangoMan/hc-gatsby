import React from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

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
    }
`