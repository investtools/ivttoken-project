import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { type Schools } from '@prisma/client'
import { Loading } from './Loading'
import { Translate } from 'translate/translate'

type SchoolMapProps = {
    locale: string
    schools: Schools[]
    userZip: string
}

const provider = new OpenStreetMapProvider()

const SchoolMap: React.FC<SchoolMapProps> = ({ schools, userZip, locale }) => {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
    const [schoolPositions, setSchoolPositions] = useState<[number, number][] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const t = new Translate(locale)

    useEffect(() => { setIsLoaded(typeof window !== "undefined") }, [])

    useEffect(() => {
        if (!isLoaded) {
            return
        }
        const fetchGeoData = async () => {
            const userResults = await provider.search({ query: "10001" })
            if (userResults[0]) {
                setUserPosition([userResults[0].y, userResults[0].x])
            }

            const newSchoolPositions: [number, number][] = []
            for (const school of schools) {
                const schoolResults = await provider.search({ query: `${school.address}, ${school.city}, ${school.state}, ${school.zipCode}` })
                if (schoolResults[0]) {
                    newSchoolPositions.push([schoolResults[0].y, schoolResults[0].x])
                }
            }
            setSchoolPositions(newSchoolPositions)
        }

        void fetchGeoData()
    }, [schools, userZip, isLoaded])

    if (!isLoaded || !userPosition || !schoolPositions) return <Loading locale={locale} />

    return (
        <MapContainer center={userPosition} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userPosition}>
                <Popup>You are here</Popup>
            </Marker>
            {schoolPositions.map((pos, index) => (
                <Marker key={index} position={pos}>
                    <Popup>School {index + 1}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}

export default SchoolMap