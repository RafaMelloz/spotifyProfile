import { authOptions } from "@/lib/auth"
import axios from "axios"
import { getServerSession } from "next-auth"
import Image from "next/image"

export default async function SingleArtistPage({params}: {params: {id: string}}){
    const session = await getServerSession(authOptions)

    const getArtist = async (id: string) => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                    'Cache-Control': 'no-store'
                }
            })
            const data = response.data
            return data
        } catch (error) {
            window.location.reload()
        }
    }

    const artist = await getArtist(params.id)

    return(
        <main className="h-screen80 w-full flex justify-center items-center flex-col gap-5"> 
            <Image src={artist.images[0].url} alt={artist.name} width={312} height={312} className="rounded-full w-52 md:w-full max-w-[312px]"/>
            <h2 className="text-4xl md:text-7xl text-white font-bold">{artist.name}</h2>
            <div className="flex gap-10 text-zinc-400 text-base mx-auto w-fit">
                <span className="text-center">
                    <b className="text-bold text-spotify text-lg block text-center">{new Intl.NumberFormat('de-DE').format(artist.followers.total)}</b>
                    Seguidores
                </span>

                <span className="text-center">
                    <b className="text-bold text-spotify text-lg block text-center flex-nowrap capitalize">{artist.genres[0]}</b>
                    Gênero
                </span>

                <span className="text-center">
                    <b className="text-bold text-spotify text-lg block text-center">{artist.popularity}%</b>
                    Seguidores
                </span>
            </div>
        </main>
    )
}