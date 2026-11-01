import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Las fotos de Hero/Servicios viven en el CDN de Google (AI Studio).
    // Se marcan como `unoptimized` en cada <Image> para no depender del
    // optimizador externo en tiempo de ejecución.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
    ],
  },
};

export default nextConfig;
