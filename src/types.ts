/**
 * A timestamp in ISO8601 format with milliseconds
 *
 * @example "2020-03-16T18:33:03.000Z"
 */
export type ISO8601Timestamp = string
/** A date in the format YYYY-MM-DD */
export type ISO8601Date = string
/** Unix epoch in milliseconds */
export type EpochMillis = number

export type DateLike = Date | ISO8601Date | EpochMillis

export type ISO2CountryCode = string
export type ISO3CountryCode = string
export type ISOCountryCode = ISO2CountryCode | ISO3CountryCode

export type URLString = string
