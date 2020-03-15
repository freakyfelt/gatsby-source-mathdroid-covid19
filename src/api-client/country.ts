import { AxiosInstance } from 'axios'
import {
  CountryDetailRequest,
  CountryRegionDetail,
  CountrySummaryResponse,
  ISO2CountryCode,
  ISO3CountryCode
} from './types'

export interface CountryRegionDetailResponse { data: CountryRegionDetail[] }
export interface ListAllCountriesResponse {
  data: {
    countries: Record<string, ISO2CountryCode>
    iso3: Record<ISO2CountryCode, ISO3CountryCode>
  }
}

export default class CountryStore {
  constructor (private readonly client: Pick<AxiosInstance, 'get'>) {}

  async listAllCountries (): Promise<ListAllCountriesResponse> {
    const url = '/api/countries'

    return this.client.get(url)
  }

  async getSummary (
    input: CountryDetailRequest
  ): Promise<CountrySummaryResponse> {
    const url = `/api/countries/${input.country}`

    return this.client.get(url)
  }

  /**
   * Cases per region in the provided country sorted by confirmed cases
   * @param input
   */
  async getConfirmed (input: CountryDetailRequest): Promise<CountryRegionDetailResponse> {
    const url = `/api/countries/${input.country}/confirmed`

    return this.client.get(url)
  }

  /**
   * Cases per region in the provided country sorted by death toll
   * @param input
   */
  async getDeaths (input: CountryDetailRequest): Promise<CountryRegionDetailResponse> {
    const url = `/api/countries/${input.country}/confirmed`

    return this.client.get(url)
  }

  /**
   * Cases per region in the provided country sorted by recovered cases
   * @param input
   */
  async getRecovered (input: CountryDetailRequest): Promise<CountryRegionDetailResponse> {
    const url = `/api/countries/${input.country}/confirmed`

    return this.client.get(url)
  }
}
