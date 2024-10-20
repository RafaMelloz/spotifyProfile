'use client'

import { LoadingComponent } from "@/components/loadingComponent"
import { SwitchTimeTipe } from "@/components/switchTipeTime"
import axios from "axios"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ArtistPage(){
    const [longType, setLongType] = useState('long_term')
    const [artists, setArtists] = useState([])
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()

    const getTopArtists = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/topArtists`, {
                params: {
                    time_range: longType
                },
            })

            const data = response.data.items.map((artist: any) => {
                return {
                    name: artist.name,
                    id: artist.id,
                    image: artist.images[0]?.url, // Pegando a primeira imagem do álbum (geralmente a principal)
                };
            });
            return setArtists(data)
        } catch (error) {
            window.location.reload()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (session) {
            getTopArtists()
        }
    }, [longType])

    return (
        <main className="sm:ml-32 sm:pr-4">
            <SwitchTimeTipe longType={longType} setLongType={setLongType} desc="Artistas mais ouvidos"/>

            {loading && <LoadingComponent/> }
            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-16 gap-8 pb-28">
                    {artists.map((artist: any, index: number) => (
                        <Link href={`/home/artist/${artist.id}`} key={index} className="flex flex-col gap-2 items-center">
                            <Image src={artist.image} alt={artist.name} height={300} width={300} className="rounded-full w-48 h-48 duration-200 hover:opacity-70" />
                            <span className="text-white text-center mt-2 hover:text-spotify font-semibold duration-200">{artist.name}</span>
                        </Link>
                    ))}
                </div>
            )}

            
        </main>
    )

}