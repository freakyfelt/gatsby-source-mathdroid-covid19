import { SourceNodesArgs, NodeInput } from 'gatsby'
import { CountryRegionSummaryResponse } from '../api-client/country'
import { ResolverContext, NodeTypes } from './types'
import { ISO2CountryCode, ISO8601Timestamp } from '../types'

export interface CountrySummaryNode extends NodeInput {
  lastUpdate: ISO8601Timestamp
  country: ISO2CountryCode
  confirmed: number
  deaths: number
  recovered: number
}

export function toCountrySummaryNode (
  kit: SourceNodesArgs,
  iso2: ISO2CountryCode,
  result: CountryRegionSummaryResponse
): CountrySummaryNode {
  const node: CountrySummaryNode = {
    id: kit.createNodeId(`country-${iso2}-summary`),
    lastUpdate: result.data.lastUpdate,
    country: iso2,
    confirmed: result.data.confirmed.value,
    deaths: result.data.deaths.value,
    recovered: result.data.recovered.value,
    internal: {
      type: NodeTypes.CountrySummary,
      contentDigest: ''
    }
  }

  node.internal.contentDigest = kit.createContentDigest(JSON.stringify(node))

  return node
}

export default async function resolveCountryNodes (ctx: ResolverContext): Promise<void> {
  const { pluginOptions, apiClient, nodeKit } = ctx
  const { actions: { createNode } } = nodeKit

  const countries = pluginOptions.countries || []
  const promises = countries.map(async ({ iso2 }) => {
    let result

    try {
      result = await apiClient.countries.getSummary({ country: iso2 })
    } catch (e) {
      console.log(e)
    }

    if (!result) {
      return
    }

    const node = toCountrySummaryNode(nodeKit, iso2, result)

    createNode(node)
  })

  await Promise.all(promises)
}
