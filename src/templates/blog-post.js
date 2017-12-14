import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Img from 'gatsby-image'
import ReactDisqusComments from "react-disqus-comments";

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')

        return (
            <article className="post-single pt-5" itemScope itemType="http://schema.org/Article">
                <Helmet>
                    <title>{`${post.frontmatter.title} | Hunter Chang`}</title>
                    <meta name="author" content="Hunter Chang" />
                    <meta name="description" content={post.frontmatter.description} />
                </Helmet>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">

                            <h1 className="post-title h2" itemProp="name headline">{post.frontmatter.title}</h1>
                            <p className="mb-4"><small itemProp="datePublished">{post.frontmatter.date}</small></p>
                            <Img className="mb-5" sizes={post.frontmatter.image.childImageSharp.sizes} />

                            <div className="pb-4" dangerouslySetInnerHTML={{ __html: post.html }} />

                            <hr />

                            <div className="mb-5 mt-5">
                                <ReactDisqusComments
                                    shortname="hunter-chang"
                                    identifier={post.title}
                                    title={post.frontmatter.title}
                                    url={"https://hunterchang.com" + post.frontmatter.path}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <meta itemProp="author" content="Hunter Chang" />
            </article>
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
                path
                description
                image {
                    childImageSharp{
                        sizes(maxWidth: 920) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`