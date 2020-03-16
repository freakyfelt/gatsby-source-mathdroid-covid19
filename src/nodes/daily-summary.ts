import { SourceNodesArgs, NodeInput } from 'gatsby'
import { ResolverContext, NodeTypes } from './types'
import { ISO8601Date } from '../types'
import { DailySummaryEntry } from '../api-client/types'
import { dateToStr } from '../api-client/util'

export interface DailySummaryNode extends NodeInput {
  reportDate: ISO8601Date

  mainlandChina: number
  otherLocations: number

  totalConfirmed: number
  totalRecovered: number | null

  deltaConfirmed: number
  deltaRecovered: number | null
}

export function toDailySummaryNode (
  kit: SourceNodesArgs,
  result: DailySummaryEntry
): DailySummaryNode {
  const {
    mainlandChina,
    otherLocations,
    totalConfirmed,
    totalRecovered,
    deltaConfirmed,
    deltaRecovered
  } = result

  // Yes, there's a reportDateString, but it's formatted with '/'
  const reportDate = dateToStr(result.reportDate)

  const node: DailySummaryNode = {
    id: kit.createNodeId(`daily-summary-${reportDate}`),
    reportDate,

    mainlandChina,
    otherLocations,

    totalConfirmed,
    totalRecovered,
    deltaConfirmed,
    deltaRecovered,

    internal: {
      type: NodeTypes.DailySummary,
      contentDigest: ''
    }
  }

  node.internal.contentDigest = kit.createContentDigest(JSON.stringify(node))

  return node
}

export default async function resolveDailySummaryNodes (ctx: ResolverContext): Promise<void> {
  const { apiClient, nodeKit, pluginOptions } = ctx
  const { actions: { createNode } } = nodeKit

  if (!pluginOptions.dailySummary) {
    return
  }

  const result = await apiClient.daily.getSummary()

  if (!result) {
    return
  }

  result.data.forEach((entry) => {
    const node = toDailySummaryNode(nodeKit, entry)

    createNode(node)
  })
}
