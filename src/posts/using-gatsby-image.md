---
title: An Introduction To Using Gatsby Image
date: "2017-11-19"
path: "/using-gatsby-image/"
image: "./img/gatsby-image.jpg"
description: "Gatsby-image is a React component that works with Gatsby.js to give you an easy way to load and optimize images on a website."
---


With the rise of mobile browsing, the optimization of images on a website is more important than ever. If a site is image heavy, it's always a good idea to lazy load images that are further down the page to speed up the initial render. However, optimizing and implementing lazy loading images can be pretty time consuming. [Gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image) is a React component that works with Gatsby.js to give you an easy way to load and optimize images on a website.

If you haven't already, go through the official [Gatsby.js tutorial](https://www.gatsbyjs.org/tutorial/) first, you'll need to know some of the basics of Gatsby and GraphQL before we get started. Here is a demo of what we'll be building:

<h4 class="mt-4 mb-4"><a href="http://hc-gatsby-image-demo.surge.sh/">Gatsby Image Demo</a> <small>( <a href="https://github.com/ChangoMan/gatsby-image-demo">view source</a> )</small></h4>

Let's start off by installing and running the [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog):

```bash
gatsby new gatsby-image-demo https://github.com/gatsbyjs/gatsby-starter-blog
cd gatsby-image-demo
gatsby develop
```

Go to `http://localhost:8000/` and you'll see something [like this](http://gatsbyjs.github.io/gatsby-starter-blog/). We can now add some images to this starter blog!

Let's make a new directory for our cool new images. From the root folder of the project:

```bash
cd src/
mkdir images
```

One of my go-to websites for free stock images is [https://unsplash.com/](https://unsplash.com/). Just download a few images and save them into the new `src/images` folder. I'm going to save them as one.jpg, two.jpg, and three.jpg for ease of reference.

Going back to the terminal, let's stop the `gatsby develop` and add the `gatsby-image` package:

```bash
yarn add gatsby-image
```

If you didn't use the gatsby-starter-blog mentioned above, you may need to include `gatsby-transformer-sharp` and `gatsby-plugin-sharp` as well, and make sure they are installed and included in your gatsby-config.

<h3 class="mt-5 mb-3">Adding your images folder to gatsby-config.js</h3>

Now open up `gatsby-config.js`. Since `gatsby-image` is a React component, we don't need to add it to the config file. However, we do need to set up our `src/images` folder using `gatsby-source-filesystem` so we can use GraphQL to query our images. Look for this object in the config file, in the plugins array:

```javascript
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/src/pages`,
    name: 'pages',
  },
},
```

This is telling Gatsby to look in the `/src/pages` directory for some files, and make "nodes" out of them. These nodes are needed when making the GraphQL queries for the site. This `/src/pages` directory is where all the current pages and posts are kept. We will add our images directory right under this object and change the `path` and `name` options. Your `gatsby-config.js` should now have this:

```javascript
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/src/pages`,
    name: 'pages',
  },
},
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/src/images`,
    name: 'images',
  },
},
...
```

<h3 class="mt-5 mb-3">Back into Gatsby</h3>

Let's start up Gatsby again by running `gatsby develop`. The site should look the same as before, but now we can query our new stock images. Open up `/src/pages/index.js` which is the component for the homepage. Scroll to the bottom and you'll see the GraphQL query that's currently being used:

```javascript
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

This query is currently getting the site's title from the `siteMetadata`, as well as all the posts from `allMarkdownRemark`. We'll need to add a query right below `allMarkdownRemark` for our image `one.jpg`. The query now looks like this:

```javascript
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
    imageOne: imageSharp(id: { regex: "/one.jpg/" }) {
      sizes(maxWidth: 630) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
```

`imageOne` will be a new object that's added to `this.props.data`. Since we are going to put this in the main container of the page, and it will be fluid on mobile, I'm querying for the child object called `sizes` with a maxWidth of the container size, which is 630px. There's another image type you can query for, called `resolutions` if you know the exact width and height of the image. Check out the [gatsby-image docs](https://www.gatsbyjs.org/packages/gatsby-image/) for a more detailed explanation on these image types.

Now our `one.jpg` should be ready to rock and roll. We can take a look at the data for this image by doing a `console.log(this.props.data)` inside the `render()` function, and you should see something like this:

https://i.imgur.com/8bRktxJ.png

<h3 class="mt-5 mb-3">Importing the gatsby-image component</h3>

Going back up to the top of the page, let's import the `gatsby-image` component:

```jsx
...
import Img from 'gatsby-image'

class BlogIndex extends React.Component {
...
```

And add the new component right below the existing `<Bio />` component:

```jsx
...
<Bio />

<Img sizes={this.props.data.imageOne.sizes} />

{posts.map(({ node }) => {
...
```

Your shiny new image should show up on the site now, with all optimizations in place! We can now add the other two images to our query, and add them to the page. Our full query now looks like:

```javascript
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
    imageOne: imageSharp(id: { regex: "/one.jpg/" }) {
      sizes(maxWidth: 630) {
        ...GatsbyImageSharpSizes
      }
    }
    imageTwo: imageSharp(id: { regex: "/two.jpg/" }) {
      sizes(maxWidth: 630) {
        ...GatsbyImageSharpSizes
      }
    }
    imageThree: imageSharp(id: { regex: "/three.jpg/" }) {
      sizes(maxWidth: 630) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
```

And up in our `render()` method:

```jsx
return (
  <div>
    <Helmet title={siteTitle} />
    <Bio />

    <Img sizes={this.props.data.imageOne.sizes} />

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
          <small>{node.frontmatter.date}</small>
          <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      )
    })}

    <Img sizes={this.props.data.imageTwo.sizes} />
    <Img sizes={this.props.data.imageThree.sizes} />

  </div>
)
```

If you reload the page, you should see an added "blur up" effect that comes built in with `gatsby-image` which loads a blurry placeholder image before the real one loads. Scroll down the page to see `imageTwo` and `imageThree` lazy load in!

<h4><a href="http://hc-gatsby-image-demo.surge.sh/">Finished Product</a> <small>( <a href="https://github.com/ChangoMan/gatsby-image-demo">view source</a> )</small></h4>