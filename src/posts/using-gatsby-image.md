---
title: Using Gatsby Image
date: "2017-11-19"
path: "/using-gatsby-image/"
image: "./img/gatsby-image.jpg"
---

With the rise of mobile, the optimization of images on a website is more important than ever. If a site is image heavy, it's always a good idea to lazy load images that are further down the page to speed up the initial render. However, optimizing and implementing lazy loading images can be pretty time consuming. [Gatsby-image](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-image) is a React component that works with Gatsby.js to give you an easy way to load and optimize images on a static website.

If you haven't already, go through the official [Gatsby.js tutorial](https://www.gatsbyjs.org/tutorial/) first, you'll need to know some of the basics of Gatsby and GraphQL before we get started. Here is a demo of what we'll be building:

[Gatsby Image Demo](https://using-gatsby-image.gatsbyjs.org/)

Let's start off by installing and running the [gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)

```javascript
gatsby new gatsby-image-demo https://github.com/gatsbyjs/gatsby-starter-blog
cd gatsby-image-demo
gatsby develop
```
Go to `http://localhost:8000/` and you'll see something [like this](http://gatsbyjs.github.io/gatsby-starter-blog/). We can now add some images to this starter blog!