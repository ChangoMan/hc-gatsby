import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

class BlogIndex extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title')
        const posts = get(this, 'props.data.allMarkdownRemark.edges')

        return (
            <div>

                <Helmet>
                    <title>{get(this, 'props.data.site.siteMetadata.title')}</title>
                    <meta name="description" content={get(this, 'props.data.site.siteMetadata.description')} />
                </Helmet>

                <div className="banner banner--home">
                    <div className="banner__content text-center">
                        <div className="pb-8">
                            <h1 className="text-uppercase mb-3"><strong>Hunter Chang</strong></h1>
                            <h2 className="mb-3">Front End Developer &amp; Designer</h2>
                        </div>
                        <div className="banner__arrow animation-fadeInOut">
                            <span className="fi-chevron-down h2"></span>
                        </div>
                    </div>
                </div>

                <div className="container">

                    {posts.map(post => {
                        if (post.node.path !== '/404/') {
                            const title = get(post, 'node.frontmatter.title') || post.node.path
                            return (
                                <article className="post" key={post.node.frontmatter.path} itemScope itemType="http://schema.org/Article">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6">
                                            <Link to={post.node.frontmatter.path} className="u-hover-fade">
                                                <Img sizes={post.node.frontmatter.image.childImageSharp.sizes} />
                                            </Link>
                                        </div>
                                        <div className="col-lg-6">
                                            <h3 className="mt-4 mt-lg-0" itemProp="name headline">
                                                <Link to={post.node.frontmatter.path}>
                                                    {post.node.frontmatter.title}
                                                </Link>
                                            </h3>
                                            <p className="mb-4"><small itemProp="datePublished">{post.node.frontmatter.date}</small></p>
                                            <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
                                        </div>
                                    </div>
                                    <meta itemProp="author" content="Hunter Chang" />
                                </article>
                            )
                        }
                    })}

                </div>

                <section className="section section--shaded py-6">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <Img sizes={this.props.data.gatsbyTemplate.sizes} />
                            </div>
                            <div className="col-lg-6">
                                <div className="py-4 text-center">
                                    <h3 className="mb-4">Gatsby Starters and Templates</h3>
                                    <p className="mb-4">View my collection of website templates for Gatsby.js. Gatsby is a static site generator which uses modern web technologies such as React.js, Webpack, and GraphQL.</p>
                                    <p><Link to="/gatsby-starters/" className="btn btn-outline-secondary">View Templates</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section py-6">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="py-4">
                                    <p>My name is Hunter Chang and I've been a professional web developer and designer for over 8 years. I graduated in 2008 from the College of Architecture and Planning at the University of Colorado, Boulder. I'm currently working full time as a front end engineer at <a href="https://www.marketing360.com/" target="blank">Marketing 360</a>.</p>
                                    <p>I enjoy web design and development because everyday is a new and fast-paced learning experience with unique challenges to overcome. Outside of work, I dream about seeing the world and experiencing all that it has to offer. My favorite things include traveling, exquisite cuisine, ramen, and Korean pop.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <Img sizes={this.props.data.aboutHunter.sizes} />
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        )
    }
}

BlogIndex.propTypes = {
    route: React.PropTypes.object,
}

export default BlogIndex

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
                author
                description
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    frontmatter {
                        title
                        path
                        date(formatString: "MMMM DD, YYYY")
                        image {
                            childImageSharp{
                                sizes(maxWidth: 800) {
                                    ...GatsbyImageSharpSizes
                                }
                            }
                        }
                    }
                }
            }
        }
        aboutHunter: imageSharp(id: { regex: "/about-hunter-chang/" }) {
            sizes(maxWidth: 690) {
              ...GatsbyImageSharpSizes
            }
        }
        gatsbyTemplate: imageSharp(id: { regex: "/gatsby-template/" }) {
            sizes(maxWidth: 690) {
              ...GatsbyImageSharpSizes
            }
        }
    }
`