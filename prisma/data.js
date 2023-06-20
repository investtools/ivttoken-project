import { PrismaClient } from "@prisma/client"
import axios from "axios"
const prisma = new PrismaClient()

/**
 * @param {string} state
 * @param {string} city
 */
async function openweatherCoords(state, city) {
    if (process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY) {
        const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},BR&limit=10&appid=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`
        const request = await axios.get(baseUrl)
        const response = request.data[0]
        return {
            lat: response.lat,
            lon: response.lon
        }
    }
}

/**
 * @param {string} street
 * @param {string} state
 * @param {string} city
 */
async function getLatLon(street, state, city) {
    const baseUrl = `https://geocode.maps.co/search?country=br&street=${street}&state=${state}&city=${city}`
    const request = await axios.get(baseUrl)
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

async function populateSchoolsLatLon() {
    const schools = await prisma.schools.findMany()

    for (const school of schools) {
        if (school.address !== null) {
            const street = String(school.address.split(',')[0])
            const latLon = await getLatLon(street, school.state, school.city)

            await prisma.schools.update({
                where: {
                    id: school.id
                },
                data: {
                    lat: String(latLon?.lat),
                    lon: String(latLon?.lon)
                }
            })
        }
    }
}

populateSchoolsLatLon()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


async function getAllSchools() {
    const schools = await prisma.schools.findMany()

    console.log({ schools })
}

getAllSchools()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })