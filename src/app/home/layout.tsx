import { Metadata } from "next";
import { Header } from "@/components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";


export default async function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    // Verificar se o token ainda é válido
    const accessToken = session?.accessToken;

    const tokenIsValid = await validateSpotifyToken(accessToken);

    if (!tokenIsValid) {
        redirect('/');
    }

    return (
        <>
            <Header />
            <Sidebar />
            <section className="containerSection">
                {children}
            </section>
        </>
    );
}

// Função para validar o token do Spotify
async function validateSpotifyToken(token: string | undefined) {
    if (!token) return false;

    try {
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.ok; // Retorna true se o token for válido
    } catch (error) {
        console.error("Erro ao validar token:", error);
        return false;
    }
}
