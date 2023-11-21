import type { Administrators, Role } from "@prisma/client"

export interface CreateSchool {
  name: string
  state: string
  city: string
  zipCode: string
  address: string
  inepCode: string
  email: string
  lat: string
  lon: string
  role: Role
  administrator: Administrators
}

export interface OpenWeatherResponse {
  name: string
  local_names: {
    pt: string
  }
  lat: number
  lon: number
  country: string
  state: string
}

export interface GeocodeMapsResponse {
  place_id: number
  licence: string
  powered_by: string
  osm_type: string
  osm_id: number
  boundingbox: string[]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
}

export interface GigaSchool {
  id: number
  school_id: string
  name: string
  lon: number
  lat: number
  address: string
  postal_code: string
  email: string
  education_level: string
  environment: string
  school_type: string
  country_id: number
  code: string
  country: string
  location_id: string
  admin_2_name: string
  admin_3_name: string
  admin_4_name: string
  admin_1_name: string
  giga_id_school: string
}

export interface GigaSchoolsResponse {
  success: boolean
  timestamp: string
  data: GigaSchool[]
}
