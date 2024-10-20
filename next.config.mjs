/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co', // Apenas o hostname
                pathname: '/**' // Permite todas as paths
            }
        ]
    },
};

export default nextConfig;
