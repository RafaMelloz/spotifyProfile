import { authOptions } from "@/lib/auth"
import axios from "axios"
import { getServerSession } from "next-auth"
import { signOut } from "next-auth/react"
import Image from "next/image"

interface Track{
    name: string,
    artists: [],
    image: string
    album: string
}

export default async function SingleTrackPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)

    const getTrack = async (id: string) => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    'Cache-Control': 'no-store'
                }
            })
            const data =  {
                name: response.data.name,
                artists: response.data.artists.map((artist: any) => artist.name).join(', '),
                image: response.data.album.images[0].url,
                album: response.data.album.name
            }
               
        
            return data
        } catch (error) {
            window.location.reload()
        }
    }

    const track: Track = await getTrack(params.id) as Track

    return(
        <main className="mb-20 sm:mb-0 sm:ml-40">
            <div className="flex gap-8 flex-col items-center md:items-start  md:flex-row"> 
                <Image src={track.image} alt={track.name} width={254} height={254} className="w-full md:w-full max-w-[200px] md:max-w-[254px]"/>
                
                <div className="flex flex-col gap-2 md:gap-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl md:text-4xl text-white font-bold">{track.name}</h2>
                        <h3 className="text-lg md:text-2xl text-white/60 font-bold">{track.artists}</h3>
                        <h4 className="text-sm md:text-lg text-white/40">{track.album}</h4>
                    </div>

                    <a href={`https://open.spotify.com/track/${params.id}`} target="_blank" rel="noreferrer" className="bg-spotify/80 w-fit text-white font-bold rounded-full py-2 px-4 mt-4 inline-block">Ouvir no Spotify</a>    
                </div>
            </div>
        </main>
    )
}