# TICKET: AW-009
KERNEL: 90/100
DATE: 2026-03-31
STATUS: PENDING

OBJECTIVE:
Generar OG image estático (1200x630 PNG) para previews en LinkedIn/redes sociales.

CONTEXT:
LinkedIn no muestra preview al compartir la URL porque no existe OG image. Sin esto, la web es invisible en redes sociales — crítico para la estrategia de adquisición via LinkedIn.

SCOPE:
- Crear script Node.js que genere el OG image usando Canvas API (@napi-rs/canvas o canvas npm)
- Imagen: 1200x630px
- Fondo: #050505
- Texto principal: "Alex Cano" centrado, blanco #FAFAFA, ~72px, font Space Grotesk o sans-serif
- Subtítulo: "CTO · AI Orchestrator · Builder" en #00D282, ~24px, debajo del nombre
- Decoración: ~30-50 puntos/partículas en #00D282 con opacidad variable (0.1-0.4) dispersos por el fondo (simular el flow field estático)
- Línea sutil horizontal debajo del subtítulo, #00D282 a 20% opacidad
- Guardar en public/og-image.png
- Alternativa si canvas deps dan problemas: crear el OG image como componente SVG convertido a PNG, o usar un diseño simple con CSS-to-image

AFFECTED FILES:
- scripts/generate-og.js (CREATE — script temporal, se puede borrar después)
- public/og-image.png (CREATE — output final)

CONSTRAINTS:
- NO servicios externos (no Cloudinary, no APIs)
- Si la dependencia de canvas da problemas en el entorno, alternativa: crear un SVG estático y convertirlo con sharp, o simplemente crear el PNG manualmente con sharp + compositing
- El script es one-shot — no necesita ser bonito, solo funcional
- Tamaño del PNG: < 500KB

ACCEPTANCE:
- [ ] public/og-image.png existe (1200x630)
- [ ] Fondo oscuro con nombre + subtítulo legibles
- [ ] Partículas verdes decorativas visibles
- [ ] Archivo < 500KB

DELEGATION:
- Architect: SKIP (straightforward)
- Builder: EXECUTE
- Tester: VALIDATE (verificar que el archivo existe y tiene dimensiones correctas)

---

# TICKET: AW-010
KERNEL: 92/100
DATE: 2026-03-31
STATUS: PENDING (depende de AW-009)

OBJECTIVE:
Configurar metadata OpenGraph completa en layout.tsx para que LinkedIn, Twitter y redes sociales muestren preview correcta.

CONTEXT:
Sin OG tags correctos, compartir la URL en LinkedIn muestra un bloque vacío sin imagen ni descripción. Esto mata la conversión desde LinkedIn — que es el canal principal de adquisición.

SCOPE:
- Actualizar metadata en src/app/layout.tsx con:
  ```typescript
  export const metadata: Metadata = {
    title: 'Alex Cano — CTO técnico · Productos con IA',
    description: 'Construyo productos completos con inteligencia artificial. Del concepto al deploy. 5+ productos en producción.',
    metadataBase: new URL('https://alexweb-psi.vercel.app'),
    openGraph: {
      title: 'Alex Cano — CTO técnico · Productos con IA',
      description: 'Construyo productos completos con IA. Del concepto al deploy.',
      url: 'https://alexweb-psi.vercel.app',
      siteName: 'Alex Cano',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Alex Cano — CTO & AI Orchestrator',
        },
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Alex Cano — CTO técnico · Productos con IA',
      description: 'Construyo productos completos con IA. Del concepto al deploy.',
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
  ```
- Verificar que el metadataBase apunta a la URL correcta de Vercel
- Después de deploy: verificar con `curl -I https://alexweb-psi.vercel.app` que los headers son correctos
- Verificar que /og-image.png es accesible públicamente

AFFECTED FILES:
- src/app/layout.tsx (MODIFY — metadata section)

CONSTRAINTS:
- metadataBase DEBE ser la URL actual de Vercel (cambiar a alexcano.dev cuando se conecte el dominio)
- NO usar next/og (generación dinámica) — overkill para una landing estática
- NO añadir dependencias

ACCEPTANCE:
- [ ] `npm run build` — 0 errors
- [ ] `curl https://alexweb-psi.vercel.app/og-image.png` devuelve 200
- [ ] HTML renderizado incluye `<meta property="og:image">`
- [ ] HTML renderizado incluye `<meta property="og:title">`
- [ ] HTML renderizado incluye `<meta property="og:description">`
- [ ] HTML renderizado incluye `<meta name="twitter:card">`
- [ ] Redeploy a Vercel exitoso

POST-DEPLOY:
- Ir a https://www.linkedin.com/post-inspector/
- Pegar https://alexweb-psi.vercel.app
- Verificar que muestra imagen, título y descripción
- Si LinkedIn cachea versión vieja: esperar 10-15 minutos y volver a inspeccionar

DELEGATION:
- Architect: SKIP
- Builder: EXECUTE
- Tester: VALIDATE (curl checks + build)