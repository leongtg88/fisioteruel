import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-work-sans",
  display: "swap",
});

// Las tipografías de texto se autohospedan con next/font. El icon font
// Material Symbols necesita los ejes variables FILL/GRAD/opsz (no está
// disponible en next/font), así que se sirve desde el CDN de Google Fonts.
const MATERIAL_SYMBOLS_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";

export const metadata: Metadata = {
  title: {
    default: "Fisioteruel - Fisioterapia y Masajes a Domicilio",
    template: "%s | Fisioteruel",
  },
  description:
    "Fisioterapia a domicilio y masajes terapéuticos profesionales en Teruel. Cuidado personalizado en la comodidad de tu hogar.",
  metadataBase: new URL("https://fisioteruel.com"),
  openGraph: {
    title: "Fisioteruel - Fisioterapia y Masajes a Domicilio",
    description:
      "Fisioterapia a domicilio y masajes terapéuticos profesionales en Teruel. Cuidado personalizado en la comodidad de tu hogar.",
    locale: "es_ES",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f766e",
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
      className={`${sourceSerif.variable} ${workSans.variable}`}
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
      <body className="bg-cream-bg text-[#161b28] font-sans">
        <div className="min-h-screen flex flex-col justify-between bg-cream-bg font-sans relative overflow-x-hidden">
          {/* Mesh Background Elements from Frosted Glass Theme */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] bg-blue-300 rounded-full blur-[120px] opacity-25"></div>
            <div className="absolute bottom-[5%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] bg-teal-200 rounded-full blur-[110px] opacity-35"></div>
            <div className="absolute top-[35%] right-[15%] w-[35vw] h-[35vw] max-w-[400px] bg-indigo-200 rounded-full blur-[130px] opacity-20"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-between flex-1 min-h-screen">
            <Header />
            <main className="flex-grow pb-16 relative z-10">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
