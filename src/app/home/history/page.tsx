import { Track } from "@/components/track";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

export default async function HistoryPage() {
    const session = await getServerSession(authOptions)

    const getRecentlyTracks = async (session: any) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played ', {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    'Cache-Control': 'no-store'
                }
            })

            const data = response.data.items.map((single: any) => {
                return {
                    name: single.track.name,
                    id: single.track.id,
                    image: single.track.album.images[0]?.url, // Pegando a primeira imagem do álbum (geralmente a principal)
                    album_name: single.track.album.name,
                    artists: single.track.artists.map((artist: any) => { return artist.name })
                };
            });
            return data
        } catch (error) {
            console.error(error)
            signOut()
        }
    }  

    const recentlyTracks = await getRecentlyTracks(session)

    return (
        <main className="sm:ml-36 pb-24">
            <h2 className="text-white text-2xl font-bold mb-12">Musicas recentemente tocadas</h2>

            <ul className=" flex flex-col gap-8 w-full">
                {recentlyTracks.map((track: any) => <Track track={track} key={track.id} />)}
            </ul>
        </main>
    )
}