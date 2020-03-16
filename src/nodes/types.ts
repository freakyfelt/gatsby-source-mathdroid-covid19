import { SourceNodesArgs } from 'gatsby'
import APIClient from '../api-client'
import { DateLike } from '../types'

export enum NodeTypes {
  CountrySummary = 'Covid19CountrySummary',
  DailySummary = 'Covid19DailySummary',
  DailyProvinceStateDetail = 'Covid19DailyProvinceStateDetail',
  GlobalSummary = 'Covid19GlobalSummary',
  ProvinceStateDetail = 'Covid19ProvinceStateDetail'
}

interface CountryConfiguration {
  iso2: string
}

interface DailyConfiguration {
  /**
   * Positive integer of days prior to today to fetch
   *
   * @example 1 will only fetch yesterday
   */
  relativeDays?: number
  /**
   * Fetch data for specific days
   */
  dates?: DateLike[]
}

export interface Covid19PluginOptions {
  baseURL?: string
  countries: CountryConfiguration[]

  /**
   * Add nodes for the global summary (/api)
   *
   * Defaults to true for backwards compatibility
   */
  globalSummary?: boolean
  /**
   * Add nodes for the daily summary (/api/daily)
   *
   * Defaults to false
   */
  dailySummary?: boolean
  /**
   * Add nodes for detailed days (/api/daily/[date])
   *
   * Defaults to false
   */
  daily?: DailyConfiguration
}

export interface ResolverContext {
  apiClient: APIClient
  nodeKit: SourceNodesArgs
  pluginOptions: Covid19PluginOptions
}
