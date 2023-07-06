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