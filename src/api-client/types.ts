import { AxiosInstance } from 'axios'
import { ISOCountryCode, URLString, ISO8601Timestamp, ISO2CountryCode, ISO3CountryCode, ISO8601Date } from '../types'

export interface CountryRegionDetailRequest {
  country: ISOCountryCode
}

export interface CountryRegionSummary {
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
  lastUpdate: ISO8601Timestamp
}

export interface ProvinceStateDetail {
  provinceState: string | null
  countryRegion: string
  iso2: ISO2CountryCode
  iso3: ISO3CountryCode
  lat: number
  long: number

  confirmed: number
  recovered: number
  deaths: number
  active: number
  lastUpdate: ISO8601Timestamp
}

export interface DailySummaryEntry {
  objectid: number
  reportDate: number
  reportDateString: ISO8601Date
  mainlandChina: number
  otherLocations: number
  totalConfirmed: number
  totalRecovered: number | null
  deltaConfirmed: number
  deltaRecovered: number | null
}

export interface DailyProvinceStateEntry {
  provinceState: string | null
  countryRegion: string
  lastUpdate: ISO8601Timestamp
  confirmed: string
  deaths: string
  recovered: string
}

export type GetHTTPClient = Pick<AxiosInstance, 'get'>
