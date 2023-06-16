import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { type Schools } from '@prisma/client'
import { Loading } from './Loading'
import { Translate } from 'translate/translate'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import SearchIcon from '../icons/SearchIcon'

type SchoolMapProps = {
    locale: string
    schools: Schools[]
}

const provider = new OpenStreetMapProvider()

const SchoolMap: React.FC<SchoolMapProps> = ({ schools, locale }) => {
    const [userPosition, setUserPosition] = useState<[number, number] | null>(null)
    const [schoolPositions, setSchoolPositions] = useState<[number, number][] | null>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [userZip, setUserZip] = useState("10001")
    const t = new Translate(locale)

    useEffect(() => { setIsLoaded(typeof window !== "undefined") }, [])

    useEffect(() => {
        if (!isLoaded) {
            return
        }
        const fetchGeoData = async () => {
            const userResults = await provider.search({ query: userZip })
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

    if (!isLoaded || !schoolPositions) return <Loading locale={locale} />

    return (
        <div>
            <div className="flex items-center justify-center mb-2 text-ivtcolor2 font-bold">
                <label htmlFor="search" className="mr-2">{t.t("Search:")}</label>
                <div className="relative">
                    <input className="rounded-full border p-1 focus:outline-none focus:ring focus:ring-ivtcolor hover:drop-shadow-xl mr-2 pl-8" placeholder={"00000-000"} id="search" type="text" value={userZip} onChange={e => setUserZip(e.target.value)} />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none ">
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <MapContainer className='map' center={userPosition} zoom={14}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={userPosition}>
                    <Popup>{t.t("You are here!")}</Popup>
                </Marker>
                {schoolPositions.map((pos, index) => (
                    <Marker key={index} position={pos}>
                        <Popup>{t.t("School")}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default SchoolMap