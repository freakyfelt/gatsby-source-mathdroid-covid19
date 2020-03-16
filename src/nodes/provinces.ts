import { SourceNodesArgs, NodeInput } from 'gatsby'
import { ProvinceStateDetail } from '../api-client/types'
import { ResolverContext, NodeTypes } from './types'
import { toProvinceID } from './util'

export interface ProvinceStateDetailNode extends NodeInput {
  provinceState: string | null
  countryRegion: string | null
  iso2: string
  iso3: string
  lat: number
  long: number
  lastUpdate: Date

  active: number
  confirmed: number
  deaths: number
  recovered: number
}

export function toProvinceStateNode (
  kit: SourceNodesArgs,
  result: ProvinceStateDetail
): ProvinceStateDetailNode {
  const {
    provinceState,
    countryRegion,
    lat,
    long,
    iso2,
    iso3,

    active,
    confirmed,
    recovered,
    deaths
  } = result

  const provinceId = toProvinceID(result)

  const node: ProvinceStateDetailNode = {
    id: kit.createNodeId(`detail-${provinceId}`),
    iso2,
    iso3,
    provinceState,
    countryRegion,
    lat,
    long,

    lastUpdate: new Date(result.lastUpdate),
    active,
    confirmed,
    deaths,
    recovered,
    internal: {
      type: NodeTypes.ProvinceStateDetail,
      contentDigest: ''
    }
  }

  node.internal.contentDigest = kit.createContentDigest(JSON.stringify(node))

  return node
}

export default async function resolveProvinceStateNodes (ctx: ResolverContext): Promise<void> {
  const { apiClient, nodeKit } = ctx
  const { actions: { createNode } } = nodeKit

  let result
  try {
    result = await apiClient.global.getConfirmed()
  } catch (e) {
    console.log(e)
  }

  if (!result) {
    return
  }

  result.data.forEach((entry) => {
    const node = toProvinceStateNode(nodeKit, entry)

    createNode(node)
  })
}
