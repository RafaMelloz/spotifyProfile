'use client'

import { signOut, useSession } from "next-auth/react"
import { FaSpotify } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";

export function Header() {
    const { status } = useSession()

    function handleLogout() {
        if (status === 'authenticated') {
            signOut()
        }
    }

    return (
        <header className="w-full flex justify-end items-center p-6">
            {status === 'loading' && (
                <LuLoader2 className="animate-spin text-zinc-100" size={20}/>
            )}

            {status !== 'loading' && (
                <FaSpotify fontSize={48} className="text-spotify/80 cursor-pointer hover:text-spotify duration-200" onClick={handleLogout} />
            )}
        </header>
    )
}