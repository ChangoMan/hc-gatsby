module.exports = {
  siteMetadata: {
    title: "Hunter Chang - Web Developer & Designer",
    author: "Hunter Chang",
    description: "Hunter Chang is a web developer and designer living in beautiful Colorado."
  },
  pathPrefix: '/',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
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
          "gatsby-remark-copy-linked-files",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `noto serif\:400,400i,700`,
          `lato\:300,400,400i,700`
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`
  ],
}
