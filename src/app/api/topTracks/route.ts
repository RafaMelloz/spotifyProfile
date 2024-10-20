import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'ERROR' }, { status: 500 });;
    }


    const { searchParams } = new URL(req.url);
    const longType = searchParams.get('time_range');

    try {
        const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${longType}&limit=50`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
                'Cache-Control': 'no-store'
            }
        })

        return NextResponse.json(response.data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Erro ao buscar musicas' }, { status: 500 });
    }
}