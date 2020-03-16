
interface ProvinceNode {
  provinceState: string | null
  countryRegion: string
}

export function toProvinceID (obj: ProvinceNode): string {
  return [obj.provinceState, obj.countryRegion].join(':')
}
