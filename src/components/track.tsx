import Image from "next/image";
import Link from "next/link";

interface Track {
    track:{
        name: string,
        id: string
        image: string
        album_name: string
        artists: []
    }
}

export function Track({ track }: Track ){
    return(
        <li className="w-full">
            <Link href={`/home/track/${track.id}`} className="flex items-center justify-start gap-4 w-full">
                <Image src={track.image} width={52} height={52} alt={`track ${track.name}`} className="hover:opacity-60 duration-200"/>

                <div className="flex flex-col w-[calc(100%-68px)]">
                    <p className="text-white font-semibold hover:text-spotify duration-200">{track.name}</p>
                    <p className="text-zinc-400 text-sm truncate ">{track.artists.map(artist => artist).join(', ')} · {track.album_name}</p>
                </div>
            </Link>
        </li>
    )
}