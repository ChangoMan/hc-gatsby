---
title: Featured Blog Images In Gatsby.js
date: "2017-11-24"
path: "/gatsby-featured-images/"
image: "./img/gatsby-featured-image.jpg"
description: "Adding a cover or featured image to Gatsby.js blog posts."
---

With [Gatsby.js](https://www.gatsbyjs.org/), it's pretty easy to get a static site up and running with one of their starter templates. The `gatsby-starter-blog` (https://github.com/gatsbyjs/gatsby-starter-blog) demonstrates how a Gatsby static site can function with blog posts written in markdown files. There is a list of blog posts on the homepage, but it would be nice to see a featured image with each post. Let's dive into the `gatsby-starter-blog` and associate a featured or cover image to a markdown post.

<h4 class="mt-4 mb-4"><a href="http://hc-gatsby-featured-image-demo.surge.sh/">Gatsby Featured Image Demo</a> <small>( <a href="https://github.com/ChangoMan/gatsby-featured-image-demo">view source</a> )</small></h4>

Start by installing the [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog) official starter.

```bash
gatsby new gatsby-blog https://github.com/gatsbyjs/gatsby-starter-blog
cd gatsby-blog
gatsby develop
```

Open up your browser and head to  `http://localhost:8000/` to see the starter Gatsby site. You can see three blog posts on the homepage, but no images are associated with them. Let's fix that!

<h3 class="mt-5 mb-3">Exploring the file structure and plugins</h3>

First, let's explore how this site is working right now. If we look at the file structure of this site, it looks like this:

[Gatsby Starter Blog File Structure](https://i.imgur.com/Mz1c2La.png)

We can see that all the blog posts live in the `/src/pages` directory, in their own separate folder. There is an image in the `hello-world` post, but that is not a featured image that we can query on the homepage. The `index.js` that's in `/src/pages` is the React component for the homepage.

If we open up `gatsby-config.js`, we can see the plugins used for processing the `/src/pages` directory:

```javascript
plugins: [
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/src/pages`,
    name: 'pages',
  },
},
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-images`,
        options: {
          maxWidth: 590,
        },
      },
      {
        resolve: `gatsby-remark-responsive-iframe`,
        options: {
          wrapperStyle: `margin-bottom: 1.0725rem`,
        },
      },
      'gatsby-remark-prismjs',
      'gatsby-remark-copy-linked-files',
      'gatsby-remark-smartypants',
    ],
  },
},
`gatsby-transformer-sharp`,
`gatsby-plugin-sharp`,
```

The first plugin is [gatsby-source-filesystem](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/) and the path of `/src/pages` is added there as an option. This is telling Gatsby to look in that directory and make the files there available to query in GraphQL.

Since our markdown files are in there, the second plugin, [gatsby-transformer-remark](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/), will parse the markdown files into usable data nodes for GraphQL.

The last two plugins, [gatsby-transformer-sharp](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/) and [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/), are what we'll need later to process and query our featured images.

<h3 class="mt-5 mb-3">Adding a featured image to a blog post</h3>

Open up the markdown file for the latest blog post, titled "New Beginnings" here `/src/pages/hi-folks/index.md`. At the top, you'll see some info for the post, known as "frontmatter"

```markdown
---
title: New Beginnings
date: "2015-05-28T22:40:32.169Z"
---
```

Here we see the title of the post and the date published. We can add a path to our featured image here like so:

```markdown
---
title: New Beginnings
date: "2015-05-28T22:40:32.169Z"
featuredImage: "./featured-image.jpg"
---
```

Head over to https://unsplash.com/ and download a free stock image, saving it as `featured-image.jpg` in our post directory `/src/pages/hi-folks`.

Since we're here, might as well add images to the other two posts. Go ahead and download two more images, save them in the other two blogs at `/src/pages/hello-world` and `/src/pages/my-second-post`. Make sure to save all the images with the name `featured-image.jpg` Open up their respective index.md files and add `featuredImage: "./featured-image.jpg"` to the frontmatter.

You can always save the images under a different name, just make sure your frontmatter reflects this.

<h3 class="mt-5 mb-3">Displaying the featured image in the homepage query</h3>

In order to display our new featured image, we're going to install a Gatsby React component called [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/). From the terminal, let's stop our gatsby develop process and then install the gatsby-image component:

```bash
yarn add gatsby-image
```

Check out my [previous post about gatsby-image](https://hunterchang.com/using-gatsby-image/) to learn more about it.

Open up the homepage component at `/src/pages/index.js`. If we go to the bottom of this React component, we'll see the GraphQL query:

```jsx
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
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
```

Under the `allMarkdownRemark` field, you'll see the `frontmatter` data we looked at earlier. We will add the `featuredImage` field here just below the title, so your query now looks like this:

```jsx
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
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            featuredImage {
                childImageSharp{
                    sizes(maxWidth: 630) {
                        ...GatsbyImageSharpSizes
                    }
                }
            }
          }
        }
      }
    }
  }
`
```

The `childImageSharp` part is using the two Gatsby sharp plugins we mentioned earlier to process the images. `...GatsbyImageSharpSizes` is from the `gatsby-image` component we installed earlier, you can learn more about the  different image types available from the official [gatsby-image page](https://www.gatsbyjs.org/packages/gatsby-image/). Since our featured image will be fluid, we are using the `sizes` option with a maxWidth of 630px to match our content's container.

Let's start up `gatsby-develop` again and add our image. Up at the top of `/src/pages/index.js`, we'll import the `gatsby-image` component right below the Bio component:

```jsx
import Bio from '../components/Bio'
import Img from 'gatsby-image'
import { rhythm } from '../utils/typography'
```

In our `posts.map()` function, we'll add the `<Img />` component right below the `<h3>` and pass it the props for sizes. Your `return()` statement should now look like this:

```jsx
return (
  <div>
    <Helmet title={siteTitle} />
    <Bio />
    {posts.map(({ node }) => {
      const title = get(node, 'frontmatter.title') || node.fields.slug
      return (
        <div key={node.fields.slug}>
          <h3
            style={{
              marginBottom: rhythm(1 / 4),
            }}
          >
            <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
              {title}
            </Link>
          </h3>
          <Img sizes={node.frontmatter.featuredImage.childImageSharp.sizes} />
          <small>{node.frontmatter.date}</small>
          <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      )
    })}
  </div>
)
```

You should now see the featured images show up in the query of posts! However, if we click into a blog post, the featured image doesn't show up. No worries, the component for a blog post is located at `/src/templates/blog-post.js`. If you open up that file, it will look pretty similar to the index.js component. You can do the same thing here, add the `featuredImage` field to the GraphQL query at the bottom, import the `gatsby-image` component, and add the `<Img />` tag on the page. Now your blog has sweet featured images that are optimized and will lazy load in!

<h4><a href="http://hc-gatsby-featured-image-demo.surge.sh/">Finished Product</a> <small>( <a href="https://github.com/ChangoMan/gatsby-featured-image-demo">view source</a> )</small></h4>