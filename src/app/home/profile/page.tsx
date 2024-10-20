import { authOptions } from "@/lib/auth"
import { getServerSession} from "next-auth"
import axios from "axios"
import Link from "next/link"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { Track } from "@/components/track"
import { redirect } from "next/navigation"


export default async function ProfilePage(){
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/')
    }

    
    const getUser = async (session: any ) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me', {
                
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Cache-Control' : 'no-store'
                }
            })
            const data = response.data
            return data
        } catch (error) {
            window.location.reload()
        }
    }
    const getFollowed = async (session: any) => { //talvez mudar depois
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=50', {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Cache-Control': 'no-store'
                }
            })

            const data = response.data.artists.total

            return data
        }
        catch (error) {
            window.location.reload()
        }
    }
    const getTopTracks = async (session: any) =>{   
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Cache-Control': 'no-store'
                }
            })

            const data = response.data.items.map((track: any) => {
                return {
                    name: track.name,
                    id: track.id,
                    image: track.album.images[2]?.url, // Pegando a primeira imagem do álbum (geralmente a principal)
                    album_name: track.album.name,
                    artists: track.artists.map((artist: any) => {return artist.name} )
                };
            });
            return data
        } catch (error) {
            window.location.reload()	
        }
    }
    const getTopArtists = async (session: any) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10', {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Cache-Control': 'no-store'
                }
            })

            const data = response.data.items.map((artist: any) => {
                return {
                    name: artist.name,
                    id: artist.id,
                    image: artist.images[2]?.url, // Pegando a primeira imagem do álbum (geralmente a principal)
                };
            });
            return data
        } catch (error) {
            window.location.reload()	
        }
    }

    const userData = await getUser(session)
    const followedData = await getFollowed(session)
    const topTracks = await getTopTracks(session)
    const topArtists = await getTopArtists(session)

    return(
        <main className="overflow-y-auto sm:ml-24">
            <Image src={userData.images[0].url} alt="User Image" width={148} height={148} className="rounded-full mx-auto"/>
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mt-3 mb-6">{userData.display_name}</h2>

            <div className="flex gap-10 text-zinc-400 text-base mx-auto w-fit mb-12">
                <span>
                    <b className="text-bold text-spotify text-lg block text-center">{userData.followers.total}</b>
                    Seguidores
                </span>
                <span>
                    <b className="text-bold text-spotify text-lg block text-center">{followedData}</b>
                    Seguindo
                </span>
            </div>

            <div className="w-full flex flex-col sm:flex-row  justify-center gap-10 mb-24">
                <div className="w-full sm:w-5/12">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-white text-xl font-semibold">Artistas mais ouvidos</h3>

                        <Link href={'/home/artist'} className="rounded-full border border-white text-white py-1 px-4 hover:bg-white hover:text-black duration-200 font-semibold"> Ver mais</Link>
                    </div>

                    <ul className="flex flex-col gap-8">
                        {topArtists.map((artist: any) => (
                            <li key={artist.id}>
                                <Link href={`/home/artist/${artist.id}`} className="flex items-center gap-4 text-white font-semibold">
                                    <Image src={artist.image} width={52} height={52} alt={`artist ${artist.name}`} className="hover:opacity-60 duration-200"/>
                                    <span className="hover:text-spotify duration-200">{artist.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full sm:w-5/12">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-white text-xl font-semibold">Musicas mais ouvidas</h3>

                        <Link href={'/'} className="rounded-full border border-white text-white py-1 px-4 hover:bg-white hover:text-black duration-200 font-semibold"> Ver mais</Link>
                    </div>

                    <ul className=" flex flex-col gap-8">
                        {topTracks.map((track: any) => <Track track={track} key={track.id} />)}
                    </ul>
                </div>
            </div>
        </main>
    )
}   