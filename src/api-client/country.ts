import {
  CountryRegionDetailRequest,
  CountryRegionSummary,
  GetHTTPClient,
  ProvinceStateDetail
} from './types'
import { ISO2CountryCode, ISO3CountryCode } from '../types'

export interface CountryRegionSummaryResponse { data: CountryRegionSummary }
export interface CountryRegionDetailResponse { data: ProvinceStateDetail[] }
export interface ListAllCountriesResponse {
  data: {
    countries: Record<string, ISO2CountryCode>
    iso3: Record<ISO2CountryCode, ISO3CountryCode>
  }
}

export default class CountryStore {
  constructor (private readonly client: GetHTTPClient) {}

  async listAllCountries (): Promise<ListAllCountriesResponse> {
    const url = '/api/countries'

    return this.client.get(url)
  }

  async getSummary (input: CountryRegionDetailRequest): Promise<CountryRegionSummaryResponse> {
    const url = `/api/countries/${input.country}`

    return this.client.get(url)
  }

  /**
   * Cases per region in the provided country sorted by confirmed cases
   * @param input
   */
  async getConfirmed (input: CountryRegionDetailRequest): Promise<CountryRegionDetailResponse> {
    const url = `/api/countries/${input.country}/confirmed`

    return this.client.get(url)
  }

  /**
   * Cases per region in the provided country sorted by death toll
   * @param input
   */
  async getDeaths (input: CountryRegionDetailRequest): Promise<CountryRegionDetailResponse> {
    const url = `/api/countries/${input.country}/confirmed`

    return this.client.get(url)
  }

  /**
   * Cases per region in the provided country sorted by recovered cases
   * @param input
   */
  async getRecovered (input: CountryRegionDetailRequest): Promise<CountryRegionDetailResponse> {
    const url = `/api/countries/${input.country}/confirmed`

    return this.client.get(url)
  }
}
