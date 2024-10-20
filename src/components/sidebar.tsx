'use client'

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuGithub, LuHistory, LuMic2, LuMusic, LuUser2 } from "react-icons/lu";

export function Sidebar(){
    const pathname = usePathname()
    const { data } = useSession()
    
    return(
        <aside className="fixed flex flex-col sidebar">
            
            {data?.user?.image && pathname !== '/home/profile' && (
                <Image src={data.user.image} alt="User Image" width={64} height={64} className="rounded-full mx-auto hidden sm:block"/>
            )}

            {!data?.user?.name && <div className="w-16 h-16 mx-auto hidden sm:block"></div>}
            {pathname === '/home/profile' && <div className="w-16 h-16 mx-auto hidden sm:block"></div>}

            <nav> 
                <ul className="text-zinc-400/70 flex justify-center sm:block">
                    <li className={`hover:text-zinc-300 duration-200 py-4 w-1/4 sm:w-auto hover:bg-spotifyGray hoverBorderGreen ${pathname === '/home/profile' && 'borderGreen text-zinc-300 bg-spotifyGray'}`}>
                        <Link href="/home/profile" className="flex flex-col justify-center items-center">
                            <LuUser2 size={20}/>
                            <span className="text-sm">Perfil</span>
                        </Link>
                    </li>


                    <li className={`hover:text-zinc-300 duration-200 py-4 w-1/4 sm:w-auto hover:bg-spotifyGray hoverBorderGreen ${pathname === '/home/artist' && 'borderGreen text-zinc-300 bg-spotifyGray'}`}>
                        <Link href="/home/artist" className="flex flex-col justify-center items-center">
                            <LuMic2 size={20} />
                            <span className="text-sm">Artistas</span>
                        </Link>
                    </li>

                    <li className={`hover:text-zinc-300 duration-200 py-4 w-1/4 sm:w-auto hover:bg-spotifyGray hoverBorderGreen ${pathname === '/home/track' && 'borderGreen text-zinc-300 bg-spotifyGray'}`}>
                        <Link href="/home/track" className="flex flex-col justify-center items-center">
                            <LuMusic size={20} />
                            <span className="text-sm">Musicas</span>
                        </Link>
                    </li>
 
                    <li className={`hover:text-zinc-300 duration-200 py-4 w-1/4 sm:w-auto hover:bg-spotifyGray hoverBorderGreen ${pathname === '/home/history' && 'borderGreen text-zinc-300 bg-spotifyGray'}`}>
                        <Link href="/home/history" className="flex flex-col justify-center items-center">
                            <LuHistory size={20} />
                            <span className="text-sm">Histórico</span>
                        </Link>
                    </li>
                </ul>
            </nav>
 
            <a href="https://github.com/RafaMelloz" target="_blank" className="text-zinc-400/70 hover:text-zinc-300 duration-200 mx-auto hidden sm:block">
                <LuGithub size={24}/>
            </a>
        </aside>
    )
}