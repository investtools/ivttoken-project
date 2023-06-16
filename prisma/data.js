import { PrismaClient } from "@prisma/client"
import axios from "axios"
const prisma = new PrismaClient()

/**
 * @param {string} city
 * @param {string} state
 */
async function getLatLon(city, state) {
    if (process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY) {
        const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},BR&limit=10&appid=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`
        const request = await axios.get(baseUrl)

        if (request.data && request.data.length > 0) {
            const [response = {}] = request.data
            return {
                lat: response.lat,
                lon: response.lon
            }
        }
    }
}

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

async function populateSchoolsLatLon() {
    const schools = await prisma.schools.findMany()

    for (const school of schools) {
        const latLon = await getLatLon(school.city, school.state)

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

populateSchoolsLatLon()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })