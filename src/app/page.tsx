'use client'

import { signIn, useSession, signOut } from "next-auth/react";

export default function Home() {
  const { status } = useSession()

  async function handleLogin() {
    if (status === 'authenticated') {
      await signOut({ redirect: false });
    }
    signIn('spotify', { callbackUrl: '/home/profile' });
  }

  return (
    <section className="flex justify-center flex-col gap-5 items-center h-full">
      <h2 className="text-4xl font-semibold text-white">Spotify Perfil</h2>

      <button onClick={handleLogin} className="text-black font-semibold bg-spotify px-4 py-2 rounded-full text-base hover:scale-105 transition-all duration-300">
        Logar com Spotify
      </button>
    </section>
  );
}



