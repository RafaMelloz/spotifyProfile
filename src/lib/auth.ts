import { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
            authorization:
                `https://accounts.spotify.com/authorize?scope=
                user-read-email,
                user-read-private,
                playlist-read-private,
                playlist-read-collaborative,
                user-library-read,user-follow-read,
                user-read-currently-playing,
                user-read-recently-played,
                user-top-read`
        })
    ],
    callbacks: {
        async jwt({ token, account, trigger }) {

            if (trigger === 'update') {
                token.accessToken = account?.access_token;
            }

            // Adiciona o accessToken ao token quando o usuário faz login
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Passa o accessToken para a sessão
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    // Adiciona a secret para criptografia/descriptografia correta
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",  // Define a estratégia de sessão como JWT
    },
};
