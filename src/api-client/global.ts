import { ProvinceStateDetail, GetHTTPClient } from './types'
import { URLString, ISO8601Timestamp } from '../types'

export interface ProvinceStateDetailResponse { data: ProvinceStateDetail[] }

export interface GlobalSummaryResponse {
  data: {
    confirmed: {
      value: number
      detail: URLString
    }
    recovered: {
      value: number
      detail: URLString
    }
    deaths: {
      value: number
      detail: URLString
    }
    dailySummary: URLString
    dailyTimeSeries: {
      pattern: URLString
      example: URLString
    }
    image: URLString
    source: URLString
    countries: URLString
    countryDetail: {
      pattern: URLString
      example: URLString
    }
    lastUpdate: ISO8601Timestamp
  }
}

export default class GlobalStore {
  constructor (private readonly client: GetHTTPClient) {}

  async getSummary (): Promise<GlobalSummaryResponse> {
    const url = '/api'

    return this.client.get(url)
  }

  /**
   * Cases per region sorted by confirmed cases
   */
  async getConfirmed (): Promise<ProvinceStateDetailResponse> {
    const url = '/api/confirmed'

    return this.client.get(url)
  }

  /**
   * Cases per region sorted by death toll
   */
  async getDeaths (): Promise<ProvinceStateDetailResponse> {
    const url = '/api/confirmed'

    return this.client.get(url)
  }

  /**
   * Cases per region sorted by recovered cases
   */
  async getRecovered (): Promise<ProvinceStateDetailResponse> {
    const url = '/api/confirmed'

    return this.client.get(url)
  }
}
