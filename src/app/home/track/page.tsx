'use client'

import { LoadingComponent } from "@/components/loadingComponent"
import { SwitchTimeTipe } from "@/components/switchTipeTime"
import { Track } from "@/components/track"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function TrackPage(){
    const [longType, setLongType] = useState('long_term')
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()


    const getTopTracks = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/topTracks`, {
                params: {
                    time_range: longType
                },
            })

            const data = response.data.items.map((track: any) => {
                return {
                    name: track.name,
                    id: track.id,
                    image: track.album.images[2]?.url, // Pegando a primeira imagem do álbum (geralmente a principal)
                    album_name: track.album.name,
                    artists: track.artists.map((artist: any) => { return artist.name })
                };
            });
            return setTracks(data)
        } catch (error) {
            window.location.reload()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() =>{
        if (session) {
            getTopTracks()
        }
    },[longType])

    return (
        <main className="sm:ml-32 sm:pr-4">
            <SwitchTimeTipe longType={longType} setLongType={setLongType} desc="Musicas mais escutadas"/>

            {loading && <LoadingComponent />}
            {!loading && (
                <ul className="flex flex-col gap-8 w-full mt-16 pb-28">
                    {tracks.map((track: any) => (
                        <Track track={track} key={track.id} />
                    ))}
                </ul>
            )}
        </main>
    )
}