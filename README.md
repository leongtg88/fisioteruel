# Fisioteruel — Next.js

Sitio de **Fisioteruel**: fisioterapia y masajes a domicilio en Teruel.
Migrado de Vite + React (SPA con navegación por `useState`) a **Next.js 16 (App
Router) + React 19 + Tailwind CSS 4**, gestionado con **pnpm**.

## Puesta en marcha

```bash
pnpm install     # instala dependencias (lockfile: pnpm-lock.yaml)
pnpm dev         # servidor de desarrollo en http://localhost:3000
```

| Comando           | Qué hace                                       |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Desarrollo con Turbopack, puerto 3000          |
| `pnpm build`      | Build de producción                            |
| `pnpm start`      | Sirve el build                                 |
| `pnpm typecheck`  | Comprobación de tipos (`tsc --noEmit`)         |

No hay variables de entorno obligatorias: las antiguas `GEMINI_API_KEY` y
`APP_URL` se usaban con dependencias que ya no están en el proyecto.

## Rutas y navegación

La navegación por pantallas (`ScreenType` + `useState` en `App.tsx`) se convirtió
en rutas reales del App Router. El menú enlaza cuatro cosas — Inicio, Servicios
y Tarifas, Planes y Agendar — más el botón «Reservar cita»:

| Ruta              | Página                                                              |
| ----------------- | ------------------------------------------------------------------- |
| `/`               | Inicio: hero, showcase de servicios, CTA y estándar de cuidado       |
| `/servicios`      | Especialidades del diseño adoptado **+** masajes, combos y extras    |
| `/planes`         | Planes y bonos, con simulador de precio                              |
| `/agendar`        | Asistente de reserva en 4 pasos                                      |
| `/reservas`       | Formulario antiguo (guarda citas en `localStorage`), **sin enlace**  |
| `/disenos/*`      | Los 3 diseños sueltos para revisarlos, **solo por URL** (noindex)    |

Quitados del menú: **«Exportar HTML»** (la página `/descargar` ya no existe),
**«Agenda Online»** (el formulario viejo vive en `/reservas`) y el desplegable
**«Diseños»**, que ahora se visita escribiendo la dirección.

## Cómo encajan los diseños nuevos

`Servicios.tsx`, `Planes.tsx` y `Agendar.tsx` llegaron como componentes de SPA
(`onChangeTab`, `onSelectServiceAndPlan`, precios en euros, `motion`,
`lucide-react`) y se adoptaron así:

- **No hacen falta ediciones para que funcionen en Next**: `CandidateShell.tsx`
  es el único `"use client"` de esa cadena, y sus props (`onChangeTab`, etc.) se
  cablean a `router.push` con `ROUTES`. Con `mode="lab"` navegan por `/disenos/*`
  y con `mode="site"` (el valor por defecto) por el sitio real.
- **Un mismo componente, dos destinos**: `/servicios`, `/planes` y `/agendar`
  usan el shell en modo `site`; `/disenos/{servicios,planes,agendar}` en modo
  `lab`. Los prototipos siguen visibles para comparar.
- **`Agendar.tsx` se monta solo en cliente**: construye el calendario con
  `new Date()` durante el render y partirlo del servidor daría un desajuste de
  hidratación. El shell muestra un marcador hasta el `useEffect` de montaje.
- **`src/types.ts`** es un shim que define `Tab` (ahora un alias de `RouteKey`),
  el tipo que los candidatos importan de `'../types'`.
- **Moneda única RD$**: se quitó el conmutador € / \$ y su provider.
  `formatPrice()` (`src/lib/format.ts`) emite `RD$ 3,750`, y las tarifas por
  especialidad están en `src/lib/prices.ts`.
- **`/servicios` fusionado**: arriba el bloque de especialidades del candidato;
  debajo `ServicesView` con `ocultarHero` para no apilar dos cabeceras. Sus
  anclas (`#fisioterapia`, `#masajes`, `#combos`) siguen sirviendo los "Saber
  más" del Inicio.

## Decisión pendiente: los 4 precios

Los candidatos venían en euros (60 / 65 / 55 / 70 €). Los traduje a RD$ con el
tipo de cambio que el propio proyecto declaraba (`1 € ≈ 62,5 RD$`) y los dejé en
`src/lib/prices.ts`:

| Especialidad   | RD$   |
| -------------- | ----- |
| Traumatológica | 3 750 |
| Deportiva      | 4 050 |
| Geriátrica     | 3 450 |
| Neurológica    | 4 400 |

**Es un cálculo mío, no una tarifa tuya.** Cambiarlas es tocar solo ese fichero.

## Estructura

```
src/
  app/           layout, globals.css y una carpeta por ruta
                 (/, /servicios, /planes, /agendar, /reservas, /disenos)
  components/    Header, Footer, CandidateShell,
                 vistas migradas (HomeView, ServicesView, BookingView)
                 y los 3 candidatos (Servicios, Planes, Agendar)
  lib/           nav.ts, data.ts, prices.ts, format.ts, types.ts, design-lab.ts
  types.ts       shim con `Tab` para los componentes candidatos
public/templates/ plantillas HTML standalone (sin página que las muestre)
```

Alias `@/*` → `src/*` (definido en `tsconfig.json`).

## Detalles técnicos de la migración a Next 16

- **Imágenes**: los `<img>` remotos pasaron a `next/image` con `fill`;
  `lh3.googleusercontent.com` e `images.unsplash.com` están allowlisteados en
  `next.config.ts` (`images.remotePatterns`). Las de Google se marcan
  `unoptimized` para no depender del optimizador externo. El hero usa `preload`
  (en Next 16 `priority` está deprecado en su favor).
- **Tipografías**: Source Serif 4 y Work Sans se autohospedan con
  `next/font/google` y se exponen como variables CSS consumidas desde
  `@theme inline` en `globals.css`. Material Symbols Outlined se carga por
  `<link>` desde el CDN: necesita los ejes variables `FILL`/`GRAD`/`opsz` y no
  está disponible en `next/font`.
- **Scroll**: `scroll-behavior: smooth` en `html` más
  `data-scroll-behavior="smooth"` en `<html>`, para que los anclajes internos se
  deslicen sin enlentecer los cambios de ruta (Next 16 ya no supera tu CSS).
- **SEO**: `index.html` desapareció; título y descripción viven en la API
  `Metadata` del layout y de cada página.
- **Tokens añadidos al tema**: `on-surface-variant`, `accent`, `accent-warm`,
  `accent-light`, `primary-container`, `secondary-container`, `text-dark` y
  `text-muted`. Los siete últimos los usaban los candidatos 183 veces sin estar
  definidos; sus valores hex son **provisionales**, míos. Si conservas el
  `tailwind.config` de donde salieron, pásamelo y lo sustituyo.
- **Corregidos** además de lo anterior: clases Tailwind inexistentes
  (`text-slate-850`, `border-emerald-250`, `duration-350`…) y la animación
  `animate-fade-in`, que se usaba pero no estaba definida.

## Dependencias

Se fueron las que no usaba nadie: `@google/genai`, `express`, `@types/express`,
`dotenv`, `esbuild`, `tsx`, `autoprefixer`, `vite`, `@vitejs/plugin-react`.
Volvieron `lucide-react` y `motion` porque los diseños nuevos sí las importan.
Se eliminaron en la adopción `CurrencyProvider` (moneda única), `TemplateViewer`
junto a la página `/descargar`, y `DesignsDropdown` al quitar el enlace del
header.

## Pendientes

- Confirmar las 4 tarifas en RD$ de `src/lib/prices.ts`.
- `metadataBase` en `src/app/layout.tsx` usa `https://fisioteruel.com` como
  marcador: cámbialo por el dominio real al desplegar.
- Teléfonos, emails y direcciones (`+34 978 000 000`, `contacto@fisioteruel.com`,
  `Av. de Sagunto`) siguen siendo los de maqueta.
- **El asistente no guarda nada**: simula el envío con un `setTimeout` de 1,8 s y
  enseña un ID aleatorio. Para recoger citas de verdad hace falta una Route
  Handler y una base de datos; mientras, `/reservas` conserva el guardado local.
- **Los dos catálogos no conversan**: el asistente solo entiende `trauma`,
  `deporte`, `geriatrica` y `neuro`. Los 6 servicios + 2 combos antiguos no
  tienen equivalente, así que sus botones "Reservar" abren `/agendar` sin
  preseleccionar. Si me dices cuál equivale a cuál, se conecta.
- Precios del bloque antiguo (masajes, combos, extras) siguen en RD$ grandes
  (5.500, 4.000…) y conviven con los nuevos (3.450–4.400) en la misma página:
  hay que unificar la escala cuando confirmes tarifas.
- No se añadió ESLint: Next 16 usa config plano (`eslint.config.mjs`) y el
  proyecto original solo ejecutaba `tsc --noEmit`. Si lo quieres:
  `pnpm add -D eslint eslint-config-next`.
