import { AxiosInstance } from 'axios'
import { ISOCountryCode, URLString, ISO8601Timestamp, ISO2CountryCode, ISO3CountryCode } from '../types'

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

export type GetHTTPClient = Pick<AxiosInstance, 'get'>
