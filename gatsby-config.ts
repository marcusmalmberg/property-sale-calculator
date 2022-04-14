import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://marcusmalmberg.github.io/property-sale-calculator`,
  },
  pathPrefix: "/property-sale-calculator",
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
  ],
}

export default config
