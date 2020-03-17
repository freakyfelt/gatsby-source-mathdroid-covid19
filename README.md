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
        countries: [{ iso2: 'DE' }], // fetch current stats for DE (Germany)
        
        // dailySummary: true /* enables global stats by day. defaults to false. */
        daily: {
          relativeDays: 14 // fetch 14 days worth of province-level data
        }
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

### Plugin Options

See the Covid19PluginOptions type in src/nodes/types.ts

## Contributing

This plugin is still pretty barebones, so pull requests are more than welcome.

Ways to help

- [ ] Get Jest up and running with some tests
- [ ] Dynamically fetch data from the Gatsby GraphQL queries?
- [ ] Make the Gatsby GraphQL nodes feel more native
- [ ] Nest related data structures in GraphQL

## Supporting

Donate to mathdro.id or Johns Hopkins for their hard work
