import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

class BlogIndex extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title')
        const posts = get(this, 'props.data.allMarkdownRemark.edges')

        return (
            <div>

                <Helmet>
                    <title>{get(this, 'props.data.site.siteMetadata.title')}</title>
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

                <div className="container">

                    <main>

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

                    </main>

                </div>
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
    }
`