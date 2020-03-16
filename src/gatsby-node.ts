import { SourceNodesArgs } from 'gatsby'
import APIClient from './api-client'
import { Covid19PluginOptions, ResolverContext } from './nodes/types'
import resolveCountries from './nodes/countries'
import resolveDailyNodes from './nodes/daily'
import resolveDailySummaryNodes from './nodes/daily-summary'
import resolveGlobal from './nodes/global'
import resolveProvinceStateNodes from './nodes/provinces'

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
  await resolveCountries(ctx)
  await resolveGlobal(ctx)
  await resolveDailySummaryNodes(ctx)
  await resolveDailyNodes(ctx)
}
