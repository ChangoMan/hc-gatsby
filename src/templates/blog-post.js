import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Img from 'gatsby-image'

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')

        return (
            <main className="post-single pt-5">
                <Helmet>
                    <title>{`${post.frontmatter.title} | Hunter Chang`}</title>
                    <meta name="author" content="Hunter Chang" />
                </Helmet>

                <div className="container">
                    <h1>{post.frontmatter.title}</h1>
                    <p className="mb-5"><small>{post.frontmatter.date}</small></p>
                </div>

                <Img className="mb-4" sizes={post.frontmatter.image.childImageSharp.sizes} />

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="pt-5 pb-5" dangerouslySetInnerHTML={{ __html: post.html }} />
                        </div>
                        {/*<div className="col-lg-4">
                            <aside>
                            </aside>
                        </div>*/}
                    </div>
                </div>
            </main>
        )
    }
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            id
            html
            frontmatter {
                title
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
`