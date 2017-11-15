import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

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
                    <p className="mb-4"><small>{post.frontmatter.date}</small></p>
                    <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
            }
        }
    }
`