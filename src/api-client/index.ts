import Axios from 'axios'
import CountryStore from './country'
import DailyStore from './daily'
import GlobalStore from './global'
import { GetHTTPClient } from './types'

interface APIClientOptions {
  /**
   * OPTIONAL Use an alternate domain for the API
   *
   * Defaults to the value in DEFAULT_OPTIONS.baseURL
   */
  baseURL?: string
  /**
   * OPTIONAL Provide an initialised Axios client with the baseURL set
   *
   * Defaults to a new Axios client with the baseURL
   */
  httpClient?: GetHTTPClient
}

const DEFAULT_OPTIONS = {
  baseURL: 'https://covid19.mathdro.id'
}

export default class APIClient {
  private readonly httpClient: GetHTTPClient
  public countries: CountryStore
  public daily: DailyStore
  public global: GlobalStore

  constructor (opts: APIClientOptions = {}) {
    if (!opts.httpClient) {
      const baseURL = opts.baseURL ?? DEFAULT_OPTIONS.baseURL
      this.httpClient = Axios.create({ baseURL })
    } else {
      this.httpClient = opts.httpClient
    }

    this.countries = new CountryStore(this.httpClient)
    this.global = new GlobalStore(this.httpClient)
    this.daily = new DailyStore(this.httpClient)
  }
}
