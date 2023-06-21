import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { type Schools } from '@prisma/client'
import { Translate } from 'translate/translate'
import SearchIcon from '../icons/SearchIcon'
import { api } from "~/utils/api"
import Loading from './Loading'
import { type Map } from 'leaflet'
import { Icon } from 'leaflet'

const schoolIcon = new Icon({
    iconUrl: '/icon1.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [25, 41],
    shadowAnchor: [11, 41]
});

const userIcon = new Icon({
    iconUrl: '/icon2.png',
    shadowUrl: '/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [25, 41],
    shadowAnchor: [11, 41]
});

type SchoolMapProps = {
    locale: string
    schools: Schools[]
}

type Coords = {
    lat: number
    lon: number
}

const UpdatePosition: React.FC<{ coordinates: Coords }> = ({ coordinates }) => {
    const map: Map = useMap()

    useEffect(() => {
        if (coordinates) {
            map.flyTo([coordinates.lat, coordinates.lon], map.getZoom())
        }
    }, [coordinates, map])
    return null
}

const SchoolMap: React.FC<SchoolMapProps> = ({ schools, locale }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [userCity, setUserCity] = useState("")
    const [coordinates, setCoordinates] = useState<{ lat: number, lon: number }>({ lat: -22.89384, lon: -43.19700 })
    const t = new Translate(locale)

    const { data } = api.schools.getLatLon.useQuery({ input: userCity })

    useEffect(() => { setIsLoaded(typeof window !== "undefined") }, [])

    useEffect(() => {
        if (data) setCoordinates({ lat: data.lat, lon: data.lon })
    }, [data])

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setCoordinates({
                    lat: latitude,
                    lon: longitude,
                })
            }, (error) => {
                console.log(error)
            })
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    }, [])

    if (!isLoaded) return <Loading locale={locale} />

    return (
        <div>
            <div className="flex items-center justify-center mb-2 text-ivtcolor2 font-bold">
                <label htmlFor="search" className="mr-2">{t.t("Search:")}</label>
                <div className="relative">
                    <input className="rounded-full border-[3px] focus:border-hover border-ivtcolor p-1 focus:outline-none focus:ring focus:ring-transparent hover:drop-shadow-xl mr-2 pl-8" placeholder={"Paraty, RJ"} id="search" type="text" value={userCity} onChange={e => setUserCity(e.target.value)} />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none ">
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <MapContainer className='map' center={[coordinates.lat, coordinates.lon]} zoom={14}>
                <UpdatePosition coordinates={coordinates} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker icon={userIcon} position={[coordinates.lat, coordinates.lon]}>
                    <Popup>{t.t("You are here!")}</Popup>
                </Marker>
                {schools.map((school) => (
                    <Marker icon={schoolIcon} key={school.id} position={[Number(school.lat), Number(school.lon)]}>
                        <Popup>
                            {school.name}<br />
                            {school.address}<br />
                            {school.city}<br />
                            {school.tokens === null ? "0 GigaTokens" : `${school.tokens} GigaTokens`}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default SchoolMap
