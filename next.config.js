// next.config.js
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "mrtlmherhdiqarnmtiyx.superbase.co",
                port: "",
            },
        ],
    },
}

export default nextConfig

// https://mrtlmherhdiqarnmtiyx.supabase.co/storage/v1/object/public/avatars/bdf9917a-38eb-411e-b6ab-78b0573fe80b.jpg
