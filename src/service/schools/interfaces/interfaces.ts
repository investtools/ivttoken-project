import type { Administrators, Role } from "@prisma/client"

export interface CreateSchool {
  name: string
  state: string
  city: string
  zipCode: string
  address: string
  cnpj: string
  inepCode: string
  email: string
  role: Role
  administrator: Administrators
}

export interface GeolocationResponse {
  name: string
  local_names: {
    pt: string
  }
  lat: number
  lon: number
  country: string
  state: string
}