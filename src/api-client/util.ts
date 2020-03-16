import { DateLike, ISO8601Date } from '../types'

const ISO_DATE_REGEXP = new RegExp('20[0-9]{2}-[0-9]{2}-[0-9]{2}')

export function dateLikeToDate (date: DateLike): Date {
  if (date instanceof Date) {
    return date
  }
  const parsed = new Date(date)

  const parsedYear = parsed.getUTCFullYear()
  if (parsedYear < 2020 || parsedYear > 2030) {
    console.warn(`[gatsby-source-mathdroid-covid19] Invalid date provided: '${date.toString()}'`)
  }

  return parsed
}

export function dateToStr (date: DateLike): ISO8601Date {
  if (typeof date === 'string' && ISO_DATE_REGEXP.test(date)) {
    return date
  }

  const parsed = dateLikeToDate(date)

  return parsed.toISOString().split('T')[0]
}
