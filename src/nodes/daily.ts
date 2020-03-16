import { SourceNodesArgs, NodeInput } from 'gatsby'
import { DateTime } from 'luxon'
import { ResolverContext, NodeTypes } from './types'
import { ISO8601Timestamp, DateLike, ISO8601Date } from '../types'
import { dateToStr } from '../api-client/util'
import { DailyProvinceStateEntry } from '../api-client/types'
import { toProvinceID } from './util'
import * as logger from '../logger'

export interface DailyProvinceStateNode extends NodeInput {
  reportDate: ISO8601Date
  provinceState: string | null
  countryRegion: string
  lastUpdate: ISO8601Timestamp
  confirmed: number
  deaths: number
  recovered: number
}

export function toDailyProvinceStateNode (
  kit: SourceNodesArgs,
  reportDate: ISO8601Date,
  result: DailyProvinceStateEntry
): DailyProvinceStateNode {
  const {
    provinceState,
    countryRegion,
    lastUpdate,
    confirmed,
    deaths,
    recovered
  } = result

  const provinceId = toProvinceID(result)

  const node: DailyProvinceStateNode = {
    id: kit.createNodeId(`daily-${reportDate}-${provinceId}`),
    reportDate,
    provinceState,
    countryRegion,
    lastUpdate,
    confirmed: parseInt(confirmed, 10),
    deaths: parseInt(deaths, 10),
    recovered: parseInt(recovered, 10),
    internal: {
      type: NodeTypes.DailyProvinceStateDetail,
      contentDigest: ''
    }
  }

  node.internal.contentDigest = kit.createContentDigest(JSON.stringify(node))

  return node
}

export default async function resolveDailyNodes (ctx: ResolverContext): Promise<void> {
  const { pluginOptions, apiClient, nodeKit } = ctx
  const { actions: { createNode } } = nodeKit

  if (!pluginOptions.daily) {
    return
  }

  const opts = pluginOptions.daily

  const datesToFetch: DateLike[] = []

  if (opts.dates) {
    datesToFetch.push(...opts.dates)
  }
  if (opts.relativeDays) {
    if (opts.relativeDays < 0) {
      throw TypeError(`Expected ${opts.relativeDays} to be a positive integer`)
    }

    const today = DateTime.utc().startOf('day')
    for (let i = opts.relativeDays; i > 0; i--) {
      const date = today.minus({ days: i }).toISODate()

      datesToFetch.push(date)
    }
  }

  const promises = datesToFetch.map(async (dateLike) => {
    const date = dateToStr(dateLike) // We need this to be a string for IDs above anyway

    let result

    try {
      result = await apiClient.daily.getDate({ date })
    } catch (err) {
      if (err.response && err.response.status === 404) {
        logger.warn(`Data is not available for ${date}`)

        return
      }

      console.dir(err)

      throw err
    }

    if (!result) {
      return
    }

    result.data.forEach((entry) => {
      const node = toDailyProvinceStateNode(nodeKit, date, entry)

      createNode(node)
    })
  })

  await Promise.all(promises)
}
