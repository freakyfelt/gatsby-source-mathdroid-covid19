# gatsby-source-mathdroid-covid19

Provides a Gatsby source plugin for the API made possible by mathdro.id's excellent work.

## Getting Started

Add the plugin to your `gatsby-config.js` file along with a list of countries whose data you want to fetch (if any).

```js
module.exports = {
  ...
  plugins: [
    {
      resolve: 'gatsby-source-mathdroid-covid19',
      options: {
        countries: [{ iso2: 'DE' }],
      },
    }
  ]
}
```

From there you will have GraphQL nodes available like the following:

```gql
query MyQuery {
  covid19GlobalSummary {
    confirmed
    recovered
    deaths
    image
  }
  allCovid19CountrySummary {
    nodes {
      country
      confirmed
      recovered
    }
  }
  allCovid19ProvinceStateDetail(filter: {iso2: {eq: "US"}}, limit: 5, sort: {order: DESC, fields: [confirmed]}) {
    nodes {
      provinceState
      confirmed
      recovered
      deaths
    }
  }
}
```

## Contributing

This plugin is still pretty barebones, so pull requests are more than welcome.

## Supporting

Donate to mathdro.id or Johns Hopkins for their hard work
