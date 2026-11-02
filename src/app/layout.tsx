import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Nunito es una variable font (200..1000, con itálicas): next/font la
// autohospeda y expone la variable CSS. Se mapea tanto a `font-sans` como a
// `font-serif` en globals.css.
const nunito = Nunito({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap",
});

// Material Symbols necesita los ejes variables FILL/GRAD/opsz y no está
// disponible en next/font, así que se sirve desde el CDN de Google Fonts.
const MATERIAL_SYMBOLS_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";

export const metadata: Metadata = {
  title: {
    default: "Fisioteruel - Fisioterapia y Masajes a Domicilio",
    template: "%s | Fisioteruel",
  },
  description:
    "Fisioterapia a domicilio, masajes terapéuticos y combos de bienestar en Santo Domingo, República Dominicana. Cuidado personalizado en la comodidad de tu hogar.",
  metadataBase: new URL("https://fisioteruel.com"),
  openGraph: {
    title: "Fisioteruel - Fisioterapia y Masajes a Domicilio",
    description:
      "Fisioterapia a domicilio, masajes terapéuticos y combos de bienestar en Santo Domingo, RD. Cuidado personalizado en la comodidad de tu hogar.",
    locale: "es_DO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f1f5f9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${nunito.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={MATERIAL_SYMBOLS_HREF} />
      </head>
      <body className="bg-cream-bg text-text-dark font-sans antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-lg focus:bg-primary-strong focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
        >
          Saltar al contenido
        </a>

        <div className="min-h-screen flex flex-col justify-between bg-cream-bg font-sans relative overflow-x-hidden">
          {/* Fondo ambiental: azul cian, amarillo y gris plomo a baja opacidad */}
          <div
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] bg-sky-200 rounded-full blur-[120px] opacity-40"></div>
            <div className="absolute bottom-[5%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] bg-yellow-200 rounded-full blur-[110px] opacity-30"></div>
            <div className="absolute top-[35%] right-[15%] w-[35vw] h-[35vw] max-w-[400px] bg-slate-300 rounded-full blur-[130px] opacity-25"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-between flex-1 min-h-screen">
            <Header />
            <main id="contenido" className="flex-grow pb-16 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
