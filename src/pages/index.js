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
                            <h1 className="text-uppercase mb-4"><strong>Hunter Chang</strong></h1>
                            <h2 className="mb-3">Front End Developer &amp; Designer</h2>
                        </div>
                        <div className="banner__arrow animation-fadeInOut">
                            <span className="fi-chevron-down h2"></span>
                        </div>
                    </div>
                </div>

                <main>

                    <div className="container">

                        {posts.map(post => {
                            if (post.node.path !== '/404/') {
                                const title = get(post, 'node.frontmatter.title') || post.node.path
                                return (
                                    <article className="post" key={post.node.frontmatter.path}>
                                        <h2>
                                            <Link to={post.node.frontmatter.path} >
                                                {post.node.frontmatter.title}
                                            </Link>
                                        </h2>
                                        <p><small>{post.node.frontmatter.date}</small></p>
                                        <p dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
                                    </article>
                                )
                            }
                        })}

                    </div>

                    <section className="section section-about">

                        <div className="row no-gutters align-items-center">
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <p>My name is Hunter Chang and I've been a professional web developer and designer for over 8 years. I graduated in 2008 from the College of Architecture and Planning at the University of Colorado, Boulder. I specialize in front-end development and am currently employed full time at Madwire. Since my time there, I have learned a tremendous amount about web development, SEO, ecommerce, and marketing.</p>
                                    <p>I enjoy web design and development because everyday is a new and fast-paced learning experience with unique challenges to overcome. Outside of work, I dream about seeing the world and experiencing all that it has to offer. I also like photography, snowboarding, boating, and spontaneous adventures.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <Img sizes={this.props.data.aboutHunter.sizes} />
                            </div>
                        </div>

                    </section>

                </main>

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
                    excerpt
                    frontmatter {
                        title
                        path
                        date(formatString: "DD MMMM, YYYY")
                    }
                }
            }
        }
        aboutHunter: imageSharp(id: { regex: "/about-hunter-chang/" }) {
            sizes(maxWidth: 1200) {
              ...GatsbyImageSharpSizes
            }
        }
    }
`