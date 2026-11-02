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
      // Fotos de especialistas/ambientes que usan los diseños candidatos
      // (src/components/Agendar.tsx y Planes.tsx, de momento con <img> nativo).
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
