const {hostname} = require("os");
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'avatars.githubusercontent.com'
            }
        ]
    },
    experimental: {
        serverActions: {
            allowedOrigins: []
        }
    }
}

module.exports = nextConfig
