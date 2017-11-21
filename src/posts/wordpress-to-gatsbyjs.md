---
title: From Wordpress to Gatsby.js
date: "2017-11-11"
path: "/wordpress-to-gatsbyjs/"
image: "./img/wordpress-gatsbyjs.jpg"
description: "Moving from WordPress to Gatsby.js, a React.js static site generator."
---

For the past 8+ years, my go-to weapon of choice when developing a website has been WordPress. According to a [recent statistic by W3Techs](https://w3techs.com/technologies/details/cm-wordpress/all/all), about 29% of all websites on the internet are built using this popular CMS. That's a **HUGE** number, and for pretty good reason. WordPress has an extensive community backing it, with tons of themes and plugins for almost any website you can think of. It's relatively easy to use and best of all, it's free. What's not to like?

The landscape of today's front end development scene is constantly changing and unfortunately for WordPress, it's no longer the new hotness. Everybody is riding the JavaScript train, with the React.js framework reigning supreme. WordPress is seen by a lot of developers as an old technology (it's been around since 2003), and it's many plugins are plagued by constant security issues. If you're anything like me, you want to stay relevant and work with the newest, coolest technologies. Allow me introduce you to [Gatsby.js](https://www.gatsbyjs.org/).

<h2 class="h3 mt-5 mb-3">About Gatsby.js</h2>

[Gatsby.js](https://www.gatsbyjs.org/) is a static site generator, which means that all the pages and blog posts are generated for you as regular HTML files and you can host them pretty much anywhere! There is no admin interface or user logins to manage. This is unlike WordPress, which requires a server that runs PHP and a MySQL database to house all the pages and posts. You can also server the static files from a content delivery network (CDN) for even better performance.

When I was first looking into static site generators, I was surprised by the [variety available](https://www.staticgen.com/). What makes Gatsby different from these other generators is that it uses trendy JavaScript technologies like [React.js](https://reactjs.org/), [Webpack](https://webpack.github.io/), and [GraphQL](http://graphql.org/). This makes it a great tool to not only build fast websites, but also get more exposure to the modern JavaScript front end. All the page templates are built using React components and it comes with [React Router](https://reacttraining.com/react-router/) built in for easy single page application (SPA) like websites.

One of the most interesting, and foreign, things to me about Gatsby.js is GraphQL. I'd never even heard of this technology until I started experimenting with Gatsby. GraphQL is a query language for APIs and it's how Gatsby gets all of its data when populating pages and posts. The data is not limited to local markdown files, you can query data from a variety of sources and content management systems, even WordPress! This means you can use WordPress and its admin panel for a back-end, and then use Gatsby to pull in those pages and posts to generate a static site when you're ready to publish. Gatsby has a ton of different [plugins](https://www.gatsbyjs.org/docs/plugins/) that allow it to work with different data sources, such as MongoDB, JSON, and even sites like Medium.

If you're interesting in getting started with Gatsby.js, I highly recommend checking out their [official tutorial](https://www.gatsbyjs.org/tutorial/). To me, WordPress is still very relevant for certain types of websites and it won't be going anywhere soon. However, if your next web project isn't terribly complex and you're itching to try something new, I'd highly suggest giving Gatsby a try.