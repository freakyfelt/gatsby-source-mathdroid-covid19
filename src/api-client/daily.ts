import { GetHTTPClient, DailySummaryEntry, DailyProvinceStateEntry } from './types'
import { DateLike } from '../types'
import { dateToStr } from './util'

export interface DailySummaryResponse {
  data: DailySummaryEntry[]
}

export interface GetDateRequest {
  date: DateLike
}

export interface GetDateResponse {
  data: DailyProvinceStateEntry[]
}

export default class DailyStore {
  constructor (private readonly client: GetHTTPClient) {}

  /**
   * Summaries for each day since the data epoch (~2020-01-20)
   */
  async getSummary (): Promise<DailySummaryResponse> {
    const url = '/api/daily'

    return this.client.get(url)
  }

  /**
   * Cases per region sorted by confirmed cases
   *
   * NOTE: Data seems to be available starting 2020-01-22
   */
  async getDate (input: GetDateRequest): Promise<GetDateResponse> {
    if (!input.date) {
      throw new TypeError('"date" is a required field')
    }

    const date = dateToStr(input.date)

    const url = `/api/daily/${date}`

    return this.client.get(url)
  }
}
