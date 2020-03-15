import { SourceNodesArgs } from 'gatsby'
import APIClient from './api-client'
import resolveCountries from './nodes/countries'
import resolveGlobal from './nodes/global'
import resolveProvinceStateNodes from './nodes/provinces'
import { Covid19PluginOptions, ResolverContext } from './nodes/types'

export const sourceNodes = async (nodeKit: SourceNodesArgs, pluginOptions: Covid19PluginOptions): Promise<void> => {
  const apiClient = new APIClient({
    baseURL: pluginOptions.baseURL
  })

  const ctx: ResolverContext = {
    apiClient,
    nodeKit,
    pluginOptions
  }

  await resolveProvinceStateNodes(ctx)
  await resolveGlobal(ctx)
  await resolveCountries(ctx)
}
