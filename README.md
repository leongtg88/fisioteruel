# Fisioteruel — Next.js

Sitio de **Fisioteruel**: fisioterapia y masajes a domicilio en Teruel.
Migrado de Vite + React (SPA con navegación por `useState`) a **Next.js 16 (App
Router) + React 19 + Tailwind CSS 4**, gestionado con **pnpm**.

## Puesta en marcha

```bash
pnpm install     # instala dependencias (lockfile: pnpm-lock.yaml)
pnpm dev         # servidor de desarrollo en http://localhost:3000
```

| Comando           | Qué hace                                        |
| ----------------- | ----------------------------------------------- |
| `pnpm dev`        | Desarrollo con Turbopack, puerto 3000           |
| `pnpm build`      | Build de producción                             |
| `pnpm start`      | Sirve el build                                    |
| `pnpm typecheck`  | Comprobación de tipos (`tsc --noEmit`)            |

No hay variables de entorno obligatorias: las antiguas `GEMINI_API_KEY` y
`APP_URL` se usaban con dependencias que ya no están en el proyecto.

## Rutas

La navegación por pantallas (`ScreenType` + `useState` en `App.tsx`) se convirtió
en rutas reales del App Router:

| Ruta         | Página                                             |
| ------------ | -------------------------------------------------- |
| `/`          | Inicio (hero, showcase de servicios, CTA, calidad) |
| `/servicios` | Catálogo de servicios, combos y extras             |
| `/agendar`   | Formulario de reserva y listado de citas locales   |
| `/descargar` | Visor de las plantillas HTML standalone            |

Detalles del mapeo:

- **Moneda (EUR/DOP)**: el `useState` de `App.tsx` ahora vive en
  `src/components/CurrencyProvider.tsx` (provider del layout raíz), persistida en
  `localStorage` y leída tras el montaje para evitar desajustes de hidratación.
- **Servicio preseleccionado**: el estado `selectedServiceId` viajaba por props;
  ahora viaja por URL (`/agendar?servicio=descarga-completa`), lo que hace que la
  reserva sea compartible.
- **Scroll a secciones**: los botones "Saber más" usan enlaces con ancla
  (`/servicios#masajes`) en lugar de `setState` + `setTimeout` + `scrollIntoView`.
- **Imágenes**: los `<img>` remotos pasaron a `next/image` con `fill`; el hostname
  `lh3.googleusercontent.com` está allowlisteado en `next.config.ts`
  (`images.remotePatterns`) y se marcan como `unoptimized` para no depender del
  optimizador externo. El hero usa `preload` (en Next 16 `priority` está
  deprecado en favor de `preload`).
- **Tipografías**: Source Serif 4 y Work Sans se autohospedan con
  `next/font/google` y se exponen como variables CSS consumidas desde
  `@theme inline` en `src/app/globals.css`. Material Symbols Outlined se sigue
  cargando por `<link>` desde el CDN de Google Fonts (necesita los ejes variables
  `FILL`/`GRAD`/`opsz` y no está disponible en `next/font`).
- **Render por petición**: `/descargar` lee las plantillas de disco con
  `connection()` de `next/server`; en Next 16 el `export const dynamic =
  "force-dynamic"` de la página se considera la vía antigua.
- **Scroll**: `scroll-behavior: smooth` en `html` + `data-scroll-behavior="smooth"`
  en `<html>` para conservar el scroll suave de los anclajes internos sin
  enlentecer los cambios de ruta (cambio de comportamiento en Next 16).
- **SEO**: `index.html` ya no existe; el `<title>`/description viven en la API
  `Metadata` del layout y de cada página.
- **Plantillas standalone**: `/descargar` muestra el contenido real de
  `public/templates/` leído en el servidor (antes el código estaba duplicado como
  string literal dentro del componente).

## Estructura

```
src/
  app/            layout, globals.css y una carpeta por ruta
  components/      Header, Footer, vistas y CurrencyProvider
  lib/             data.ts (catálogo), types.ts, format.ts, nav.ts
public/templates/  plantillas HTML standalone + header-footer.js
```

Alias `@/*` → `src/*` (definido en `tsconfig.json`).

## Diferencias de comportamiento conocidas

- `/servicios` y `/agendar` son rutas separadas: el botón "Reservar" navega en
  lugar de intercambiar el contenido en memoria, y el navegador conserva el
  historial (atrás/adelante funcionan).
- El listado de citas guardadas sigue siendo `localStorage`: es solo local al
  navegador y no se envía a ningún backend (igual que antes).
- Se corrigieron clases Tailwind inexistentes (`text-slate-850`, `text-amber-750`,
  `text-2.5xl`, `border-emerald-250`, `duration-350`…) y se añadió el token
  `--color-on-surface-variant` y la animación `animate-fade-in`, que se usaban pero
  no estaban definidos. Estos elementos ahora sí muestran su color/animación.

## Deps eliminadas en la migración

`@google/genai`, `express`, `@types/express`, `dotenv`, `motion`, `lucide-react`,
`autoprefixer`, `esbuild`, `tsx`, `vite` y `@vitejs/plugin-react` no se usaban en
`src/`. Se conservan `react`, `react-dom`, `tailwindcss` y `typescript`.

## Pendientes a decidir por ti

- `metadataBase` en `src/app/layout.tsx` usa `https://fisioteruel.com` como
  marcador: cámbialo por el dominio real al desplegar.
- Teléfonos, email y direcciones (`+34 978 000 000`, `contacto@fisioteruel.com`,
  `Av. de Sagunto`) siguen siendo los de maqueta del proyecto original.
- Las citas publicadas por `/agendar` se guardan solo en `localStorage`: para
  recibirlas de verdad haría falta una Route Handler (`app/api/reservas/route.ts`)
  y una base de datos.
- No se añadió ESLint: Next 16 usa config plano (`eslint.config.mjs`) y el proyecto
  original solo ejecutaba `tsc --noEmit`. Si lo quieres: `pnpm add -D eslint
  eslint-config-next`.
