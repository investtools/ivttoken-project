import { Administrators, Role } from "@prisma/client"
import axios from "axios"
import { type GeocodeMapsResponse, type OpenWeatherResponse } from "~/service/schools/interfaces/interfaces"

export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
}
export interface ViaCEPAddress {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
    ibge: string
    gia: string
    ddd: string
    siafi: string
    erro?: boolean
}


export function entityMap(entity: string) {
    switch (entity) {
        case "GIGA": return "Giga"
        case "UNICEF": return "Unicef"
        case "GOVERNMENT": return "Government"
        case "INVESTTOOLS": return "InvestTools"
    }
}

export function mapAdministrator(administrator: string) {
    administrator = administrator.toLowerCase()
    switch (administrator) {
        case 'state': return Administrators.STATE
        case 'estado': return Administrators.STATE
        case 'municipality': return Administrators.MUNICIPALITY
        case 'município': return Administrators.MUNICIPALITY
    }
}

export function monthMap(month: string) {
    switch (month) {
        case "JAN": return "January"
        case "FEB": return "February"
        case "MAR": return "March"
        case "APR": return "April"
        case "MAY": return "May"
        case "JUN": return "June"
        case "JUL": return "July"
        case "AUG": return "August"
        case "SEP": return "September"
        case "OCT": return "October"
        case "NOV": return "November"
        case "DEC": return "December"
        case "LOADING": return "Loading..."
        default: return "No Reports Available"
    }
}

export function connectivityQualityMap(connectivityQuality: string) {
    switch (connectivityQuality) {
        case "LOW": return "Low"
        case "HIGH": return "High"
        case "MEDIUM": return "Medium"
        case "LOADING": return "Loading..."
        default: return "No Reports Available"
    }
}

export function administratorNameMapping(name: string): string {
    switch (name) {
        case Administrators.STATE: return "State"
        case Administrators.MUNICIPALITY: return "Municipality"
        default: return "-"
    }
}

export function mapRole(role: string) {
    role = role.toLowerCase()

    switch (role) {
        case "admin": return Role.ADMIN
        case "internet service provider": return Role.ISP
        case "school administrator": return Role.SCHOOL
    }
}

export function maskPrivateKey(privateKey: string) {
    return `${privateKey.slice(0, 4)}****${privateKey.slice(-4)}`
}

async function openweatherCoords(city: string, state: string) {
    if (process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY) {
        const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},BR&limit=10&appid=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`
        const request = await axios.get<OpenWeatherResponse[]>(baseUrl)

        if (request.data && request.data.length > 0) {
            const [response = {} as OpenWeatherResponse] = request.data
            return {
                lat: response.lat,
                lon: response.lon
            }
        }
    }
}

export async function getLatLon(city: string, state: string, street: string) {
    const baseUrl = `https://geocode.maps.co/search?country=br&street=${street}&state=${state}&city=${city}`
    const request = await axios.get<GeocodeMapsResponse[]>(baseUrl)
    const response = request.data
    
    if (response.length == 0) {
        return await openweatherCoords(state, city)
    } else {
        for (const data of response) {
            if ((data.display_name.toLowerCase()).includes(city.toLowerCase())) {
                return {
                    lat: data.lat,
                    lon: data.lon
                }
            }
        }
    }
}